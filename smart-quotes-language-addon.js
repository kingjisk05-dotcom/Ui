/* ==================================================
   SMART QUOTES SYSTEM (A–Z) – FINAL MERGED VERSION
   - Alphabet meaning (A — आत्मविश्वास / Confidence)
   - Curated Hindi + English quotes
   - Single-letter trigger
   - Floating panel under search box
   - Settings panel language switch
   ================================================== */

(function () {

  /* ---------------- GLOBAL STATE ---------------- */
  const LANG_KEY = "os_quote_language";
  window.__quoteLanguage = localStorage.getItem(LANG_KEY) || "hi";

  /* ---------------- ALPHABET MEANING MAP ---------------- */
  const ALPHABET_MAP = {
    A:{hi:"आत्मविश्वास",en:"Confidence"},
    B:{hi:"भरोसा",en:"Trust"},
    C:{hi:"साहस",en:"Courage"},
    D:{hi:"धैर्य",en:"Patience"},
    E:{hi:"ऊर्जा",en:"Energy"},
    F:{hi:"फोकस",en:"Focus"},
    G:{hi:"लक्ष्य",en:"Goal"},
    H:{hi:"हिम्मत",en:"Courage"},
    I:{hi:"ईमानदारी",en:"Integrity"},
    J:{hi:"जुनून",en:"Passion"},
    K:{hi:"कर्म",en:"Action"},
    L:{hi:"लक्ष्य",en:"Purpose"},
    M:{hi:"मेहनत",en:"Hard Work"},
    N:{hi:"निश्चय",en:"Determination"},
    O:{hi:"अवसर",en:"Opportunity"},
    P:{hi:"प्रेरणा",en:"Motivation"},
    Q:{hi:"गुणवत्ता",en:"Quality"},
    R:{hi:"रिस्क",en:"Risk"},
    S:{hi:"सफलता",en:"Success"},
    T:{hi:"तपस्या",en:"Discipline"},
    U:{hi:"उम्मीद",en:"Hope"},
    V:{hi:"विश्वास",en:"Faith"},
    W:{hi:"वर्क एथिक",en:"Work Ethic"},
    X:{hi:"एक्स-फैक्टर",en:"X-Factor"},
    Y:{hi:"यकीन",en:"Belief"},
    Z:{hi:"ज़िद",en:"Persistence"}
  };

  /* ---------------- CURATED QUOTES (A–Z) ---------------- */
  const QUOTES = {
    A:{hi:["खुद पर भरोसा ही सफलता की पहली सीढ़ी है।","आत्मविश्वास डर को हराता है।","जो खुद पर विश्वास करता है, वही आगे बढ़ता है।"],
       en:["Confidence is the first step toward success.","Believe in yourself.","Confidence turns dreams into reality."]},
    B:{hi:["भरोसा रिश्तों की नींव होता है।","खुद पर भरोसा सबसे बड़ी ताकत है।"],
       en:["Trust is built with consistency.","Believe first, results follow."]},
    C:{hi:["साहस डर के बावजूद आगे बढ़ना है।","साहस बदलाव लाता है।"],
       en:["Courage begins where fear ends.","Growth requires courage."]},
    D:{hi:["धैर्य सफलता की पहचान है।","समय सब सिखा देता है।"],
       en:["Patience always pays off.","Good things take time."]},
    E:{hi:["ऊर्जा सही दिशा में लगाओ।","ऊर्जा ही परिणाम लाती है।"],
       en:["Energy flows where focus goes.","Positive energy creates results."]},
    F:{hi:["फोकस से ही मंज़िल मिलती है।","बिखरा दिमाग हार जाता है।"],
       en:["Focus creates excellence.","Where focus goes, growth follows."]},
    G:{hi:["लक्ष्य बिना मेहनत बेकार है।","लक्ष्य दिशा देता है।"],
       en:["Goals give direction.","Clear goals create success."]},
    H:{hi:["हिम्मत मुश्किल आसान करती है।","डर से आगे बढ़ो।"],
       en:["Courage makes things possible.","Be brave enough to start."]},
    I:{hi:["ईमानदारी सबसे बड़ी ताकत है।","सच्चाई कभी कमजोर नहीं होती।"],
       en:["Integrity builds respect.","Honesty never fails."]},
    J:{hi:["जुनून मेहनत को ताकत देता है।","जुनून बिना काम अधूरा है।"],
       en:["Passion fuels success.","Work with passion."]},
    K:{hi:["कर्म ही भाग्य बनाता है।","सोच से ज़्यादा काम ज़रूरी है।"],
       en:["Action defines destiny.","Ideas need action."]},
    L:{hi:["उद्देश्य जीवन को दिशा देता है।","दिशा सही हो तो जीवन सफल है।"],
       en:["Purpose gives life meaning.","Live with direction."]},
    M:{hi:["मेहनत कभी धोखा नहीं देती।","सफलता मेहनत मांगती है।"],
       en:["Hard work beats talent.","Success respects effort."]},
    N:{hi:["निश्चय से रास्ता बनता है।","रुकना हार है।"],
       en:["Determination creates paths.","Never quit."]},
    O:{hi:["अवसर खुद बनाए जाते हैं।","सही समय पहचानो।"],
       en:["Opportunity favors the prepared.","Create your chances."]},
    P:{hi:["प्रेरणा भीतर से आती है।","खुद को उठाओ।"],
       en:["Motivation begins within.","Push yourself forward."]},
    Q:{hi:["गुणवत्ता भीड़ से अलग करती है।","बेहतर करो।"],
       en:["Quality beats quantity.","Excellence is a habit."]},
    R:{hi:["रिस्क के बिना जीत नहीं।","डर छोड़ो।"],
       en:["Risk brings growth.","Safe choices rarely win."]},
    S:{hi:["सफलता मेहनत की साथी है।","हार सीख है।"],
       en:["Success rewards persistence.","Failure is part of success."]},
    T:{hi:["अनुशासन सफलता की जड़ है।","नियमित रहो।"],
       en:["Discipline builds champions.","Consistency wins."]},
    U:{hi:["उम्मीद रोशनी देती है।","कभी हार मत मानो।"],
       en:["Hope keeps dreams alive.","Never lose hope."]},
    V:{hi:["विश्वास ताकत देता है।","खुद पर विश्वास रखो।"],
       en:["Faith fuels resilience.","Believe and proceed."]},
    W:{hi:["काम पहचान बनाता है।","मेहनत सबसे बड़ा हथियार है।"],
       en:["Strong work ethic wins.","Results follow effort."]},
    X:{hi:["अलग बनना ही एक्स-फैक्टर है।","भीड़ से अलग रहो।"],
       en:["Uniqueness is your X-factor.","Stand out confidently."]},
    Y:{hi:["यकीन से चमत्कार होते हैं।","खुद पर यकीन रखो।"],
       en:["Belief shapes reality.","Trust your journey."]},
    Z:{hi:["ज़िद से जीत मिलती है।","हार मानना विकल्प नहीं।"],
       en:["Persistence creates success.","Never give up."]}
  };

  /* ---------------- SEARCH INPUT ---------------- */
  const input = document.getElementById("searchInput");
  if (!input) return;

  /* ---------------- PANEL ---------------- */
  const panel = document.createElement("div");
  panel.id = "smartQuotePanel";
  panel.style.cssText = `
    position:absolute;
    z-index:9999;
    padding:14px;
    border-radius:16px;
    background:rgba(0,0,0,0.55);
    backdrop-filter:blur(18px);
    box-shadow:0 0 20px rgba(0,255,213,0.35);
    color:#fff;
    font-size:14px;
    display:none;
  `;
  document.body.appendChild(panel);

  function positionPanel(){
    const r=input.getBoundingClientRect();
    panel.style.top=r.bottom+window.scrollY+"px";
    panel.style.left=r.left+"px";
    panel.style.width=r.width+"px";
  }

  function show(letter){
    const L=letter.toUpperCase();
    if(!QUOTES[L]||!ALPHABET_MAP[L]) return panel.style.display="none";
    const lang=window.__quoteLanguage;
    panel.innerHTML=`
      <div style="font-weight:700;color:var(--neon);margin-bottom:6px">
        ${L} — ${ALPHABET_MAP[L][lang]}
      </div>
      ${QUOTES[L][lang].slice(0,3).map((q,i)=>`<div>${i+1}. ${q}</div>`).join("")}
    `;
    positionPanel();
    panel.style.display="block";
  }

  input.addEventListener("input",e=>{
    const v=e.target.value.trim();
    /^[a-zA-Z]$/.test(v)?show(v):panel.style.display="none";
  });

  input.addEventListener("blur",()=>setTimeout(()=>panel.style.display="none",150));

  /* ---------------- SETTINGS BUTTON ---------------- */
  window.addEventListener("load",()=>{
    const box=document.getElementById("floatingSettings");
    if(!box) return;
    const btn=document.createElement("button");
    btn.className="fs-btn";

    function sync(){
      btn.textContent=
        window.__quoteLanguage==="hi"
        ?"🌐 Quotes Language : हिंदी"
        :"🌐 Quotes Language : English";
    }

    btn.onclick=()=>{
      window.__quoteLanguage=window.__quoteLanguage==="hi"?"en":"hi";
      localStorage.setItem(LANG_KEY,window.__quoteLanguage);
      sync();
    };

    sync();
    box.appendChild(btn);
  });

})();
