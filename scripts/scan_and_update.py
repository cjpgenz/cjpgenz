import json
import os
import re
import socket
import ssl
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

# Robust paths relative to this script's directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRIPT_DIR)
FLAGGED_JSON_PATH = os.path.join(SCRIPT_DIR, "flagged_domains.json")
LLMS_FULL_PATH = os.path.join(BASE_DIR, "public", "llms-full.txt")

BRAND = "cockroachjantaparty"

# Top-Level Domains to scan
TLDS = ["com", "in", "site", "co", "online", "xyz", "buzz", "org", "net"]

# Combosquatting keywords commonly used by copycat targets
KEYWORDS = [
    "official", "support", "card", "vote", "register", "pay", "donat",
    "join", "member", "party", "apply", "login", "portal", "token",
    "coin", "help", "verify", "check", "app", "free", "claim"
]

def generate_variations(brand, keywords, tlds):
    """
    Generates lookalike combinations using typos, combosquatting, and alternative TLDs.
    """
    variations = set()
    
    # 1. TLD squatting on brand and short-hand
    for tld in tlds:
        variations.add(f"{brand}.{tld}")
        variations.add(f"cjp.{tld}")
    
    # 2. Combosquatting
    for keyword in keywords:
        for tld in tlds:
            variations.add(f"{brand}{keyword}.{tld}")
            variations.add(f"{keyword}{brand}.{tld}")
            variations.add(f"cjp{keyword}.{tld}")
            variations.add(f"{keyword}cjp.{tld}")
            
    # 3. Typosquatting (Omissions, insertions, homophones)
    typos = ["cackroachjantaparty", "cockroachjanata", "cockroachjantapartyy", "cockroachesjantaparty"]
    for typo in typos:
        for tld in tlds:
            variations.add(f"{typo}.{tld}")
            for keyword in keywords:
                variations.add(f"{typo}{keyword}.{tld}")
                variations.add(f"{keyword}{typo}.{tld}")
                
    return sorted(list(variations))

def check_dns(domain):
    """
    Checks if the domain is registered on the global internet, either as an
    actively resolving IP address or as a dormant/parked registered domain name.
    If the domain resolves to a live IP address, performs deep content scanning
    of the HTML body to extract adware, Google AdSense, phishing, and financial fraud signatures.
    Returns (domain, is_registered, is_live_ip, category, reason, activities).
    """
    category = "Potential Phishing & Impersonation"
    reason = "Active lookalike/squatted domain resolved on the network during scanning."
    activities = ["Active DNS resolution pointing to a live IP address"]

    # 1. First path: check if it resolves to an active IP locally (A-record active)
    is_live_ip = False
    is_registered = False
    try:
        socket.gethostbyname(domain)
        is_registered = True
        is_live_ip = True
    except socket.gaierror:
        pass

    # 2. Second path: query Cloudflare DNS-over-HTTPS JSON API to check registration (NS record)
    if not is_registered:
        url = f"https://cloudflare-dns.com/dns-query?name={domain}&type=NS"
        req = urllib.request.Request(url, headers={"Accept": "application/dns-json"})
        context = ssl._create_unverified_context()
        try:
            with urllib.request.urlopen(req, context=context, timeout=5) as response:
                data = json.loads(response.read().decode())
                status = data.get("Status")
                if status == 0:
                    is_registered = True
                    is_live_ip = False
        except Exception:
            pass

    if not is_registered:
        return domain, False, False, None, None, []

    # If it is a live IP address, perform active website threat scanning
    if is_live_ip:
        activities.append("Active HTTP server responding to secure requests")
        
        # Try fetching HTTPS first, then fallback to HTTP
        html = ""
        urls_to_try = [f"https://{domain}", f"http://{domain}"]
        for target_url in urls_to_try:
            try:
                req = urllib.request.Request(
                    target_url, 
                    headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) CJP-Guard Threat Intel Scanner/2.2"}
                )
                context = ssl._create_unverified_context()
                with urllib.request.urlopen(req, context=context, timeout=6) as response:
                    html = response.read().decode("utf-8", errors="ignore")
                    break
            except Exception:
                continue
                
        if html:
            detected_ads = []
            detected_phishing = []
            detected_fraud = []
            
            # Adware / Ad networks tracking scripts & links
            if "quge5.com" in html or "quge5" in html:
                detected_ads.append("quge5.com adware redirect tag")
            if "adsbygoogle" in html or "googlesyndication" in html:
                detected_ads.append("unauthorized Google AdSense blocks")
            if "popads" in html or "propellerads" in html or "adsterra" in html:
                detected_ads.append("popunder or aggressive advertising network tags")
                
            # Phishing & credential harvesting (forms, inputs, sensitive fields)
            if "type=\"password\"" in html or "type='password'" in html or "password" in html.lower():
                detected_phishing.append("password login forms")
            if "otp" in html.lower() or "one-time password" in html.lower():
                detected_phishing.append("OTP intercept screens")
            if "bank" in html.lower() or "card number" in html.lower() or "cvv" in html.lower() or "creditcard" in html.lower():
                detected_phishing.append("payment/banking credential fields")
            if "aadhaar" in html.lower() or "pan card" in html.lower():
                detected_phishing.append("sensitive government KYC identifier inputs")
                
            # Fraud / solicitations / unauthorized merchandise
            if "donation" in html.lower() or "donate" in html.lower() or "contribution" in html.lower():
                detected_fraud.append("soliciting unsolicited movement donations")
            if "upi" in html.lower() or "qr code" in html.lower() or "scan to pay" in html.lower():
                detected_fraud.append("displaying direct UPI payment links or transaction codes")
            if "merchandise" in html.lower() or "t-shirt" in html.lower() or "shop" in html.lower() or "buy" in html.lower():
                detected_fraud.append("selling fake movement merchandise")
            if "membership fee" in html.lower() or "registration fee" in html.lower():
                detected_fraud.append("charging fee for volunteer registration")
                
            # Synthesize categories, reasons, and activities
            all_detected = []
            if detected_ads:
                all_detected.append(f"Adware ({', '.join(detected_ads)})")
                activities.extend([f"Injecting {ad}" for ad in detected_ads])
            if detected_phishing:
                all_detected.append(f"Phishing ({', '.join(detected_phishing)})")
                activities.extend([f"Harvesting {p}" for p in detected_phishing])
            if detected_fraud:
                all_detected.append(f"Financial Fraud ({', '.join(detected_fraud)})")
                activities.extend([f"Soliciting {f}" for f in detected_fraud])
                
            if all_detected:
                category = " & ".join(all_detected)
                reason = f"Impersonation site actively engaged in: {', '.join(all_detected)}. Avoid visiting to protect credentials and funds."
            else:
                category = "Potential Phishing & Impersonation"
                reason = "Active lookalike domain mimicking official CJP channels with live HTTP hosting."
    else:
        # Dormant registered domains
        category = "Dormant Squatted Threat"
        reason = "Dormant but registered lookalike typosquatting target. Pre-emptively flagged to prevent future phishing launches."
        activities = ["Registered domain with active nameservers", "Pre-emptively flagged for visitor safety"]

    return domain, True, is_live_ip, category, reason, activities

def extract_documented_domains(content):
    """
    Extracts all individual exact domain names present in the file content.
    This prevents substring false positives (e.g. cjp.co matching cjpofficial.co).
    """
    # 1. Match backticked domain names like `domain.com`
    backticked = re.findall(r"`([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})`", content)
    
    # 2. Match standard domains in text descriptions using word boundaries
    raw_domains = re.findall(r"\b([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b", content)
    
    return set(backticked + raw_domains)

def main():
    print("[*] Loading flagged_domains.json...")
    if not os.path.exists(FLAGGED_JSON_PATH):
        print(f"[!] {FLAGGED_JSON_PATH} not found.")
        return

    with open(FLAGGED_JSON_PATH, "r") as f:
        flagged_data = json.load(f)

    # Keep existing domains as the master list
    existing_domains = {item["domain"] for item in flagged_data.get("flagged_domains", [])}
    excluded_domains = set(flagged_data.get("investigation_metadata", {}).get("legitimate_domains_excluded", []))
    
    # Load and read public/llms-full.txt content
    print("[*] Reading public/llms-full.txt...")
    if os.path.exists(LLMS_FULL_PATH):
        with open(LLMS_FULL_PATH, "r", encoding="utf-8") as f:
            llms_full_content = f.read()
    else:
        llms_full_content = ""
        print("[!] public/llms-full.txt not found. It will be initialized.")

    # 1. Automatic Initial Synchronization:
    # Check if there are domains in flagged_domains.json that are missing from llms-full.txt
    from_llms = extract_documented_domains(llms_full_content)
    missing_in_llms = [d for d in existing_domains if d not in from_llms]
    
    if missing_in_llms:
        missing_in_llms.sort()
        print(f"[*] Found {len(missing_in_llms)} domains in flagged_domains.json missing from llms-full.txt. Syncing automatically...")
        
        section_header = "### Documented Threat & Impersonation Domains (Do NOT trust):"
        if section_header in llms_full_content:
            header_index = llms_full_content.find(section_header)
            insert_pos = header_index + len(section_header)
            
            bullet_points = "\n" + "\n".join(f"* `{d}`" for d in missing_in_llms)
            llms_full_content = llms_full_content[:insert_pos] + bullet_points + llms_full_content[insert_pos:]
            
            with open(LLMS_FULL_PATH, "w", encoding="utf-8") as f:
                f.write(llms_full_content)
            print("[+] Successfully synchronized llms-full.txt with master database!")
        else:
            bullet_points = f"\n\n{section_header}\n" + "\n".join(f"* `{d}`" for d in missing_in_llms) + "\n"
            llms_full_content += bullet_points
            with open(LLMS_FULL_PATH, "w", encoding="utf-8") as f:
                f.write(llms_full_content)
            print(f"[+] Section header missing. Synchronized domains to end of {LLMS_FULL_PATH}!")

    print("[*] Generating potential lookalike permutations...")
    permutations = generate_variations(BRAND, KEYWORDS, TLDS)
    print(f"[*] Generated {len(permutations)} possible domain permutations to check.")
    
    # Filter out domains that are already exclusions or already in flagged_domains.json
    domains_to_scan = []
    for domain in permutations:
        if domain in excluded_domains:
            continue
        if domain in existing_domains:
            continue
        domains_to_scan.append(domain)
        
    print(f"[*] Scanning {len(domains_to_scan)} remaining domains concurrently (using ThreadPool)...")
    
    newly_discovered = []
    
    # Run DNS lookups in parallel using 50 worker threads
    max_workers = min(50, len(domains_to_scan)) if domains_to_scan else 1
    
    if domains_to_scan:
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            future_to_domain = {executor.submit(check_dns, domain): domain for domain in domains_to_scan}
            
            for future in as_completed(future_to_domain):
                domain, is_registered, is_live_ip, category, reason, activities = future.result()
                if is_registered:
                    if is_live_ip:
                        print(f"[!] Found NEW active lookalike domain: {domain}")
                        print(f"    Category: {category}")
                    else:
                        print(f"[!] Found NEW dormant registered lookalike: {domain}")

                    new_ly = {
                        "domain": domain,
                        "url": f"https://{domain}",
                        "reason": reason,
                        "risk_level": "Critical",
                        "category": category,
                        "detected_activities": activities
                    }
                    newly_discovered.append(new_ly)
                
    if newly_discovered:
        # Append to master list in flagged_domains.json
        flagged_data["flagged_domains"].extend(newly_discovered)
        # Keep everything sorted alphabetically by domain for clean ordering
        flagged_data["flagged_domains"].sort(key=lambda x: x["domain"])
        
        with open(FLAGGED_JSON_PATH, "w") as f:
            json.dump(flagged_data, f, indent=2)
        print(f"[+] Appended {len(newly_discovered)} new active lookalikes to {FLAGGED_JSON_PATH}")
        
        # Integrate new ones into public/llms-full.txt
        section_header = "### Documented Threat & Impersonation Domains (Do NOT trust):"
        if section_header in llms_full_content:
            header_index = llms_full_content.find(section_header)
            insert_pos = header_index + len(section_header)
            
            bullet_points = "\n" + "\n".join(f"* `{item['domain']}`" for item in newly_discovered)
            updated_content = llms_full_content[:insert_pos] + bullet_points + llms_full_content[insert_pos:]
            
            with open(LLMS_FULL_PATH, "w", encoding="utf-8") as f:
                f.write(updated_content)
            print(f"[+] Added {len(newly_discovered)} new domains to {LLMS_FULL_PATH}")
        else:
            bullet_points = f"\n\n{section_header}\n" + "\n".join(f"* `{item['domain']}`" for item in newly_discovered) + "\n"
            with open(LLMS_FULL_PATH, "a", encoding="utf-8") as f:
                f.write(bullet_points)
            print(f"[+] Section header missing. Appended new domains to the end of {LLMS_FULL_PATH}")
    else:
        print("[-] No new active lookalike domains resolved.")

if __name__ == "__main__":
    main()
