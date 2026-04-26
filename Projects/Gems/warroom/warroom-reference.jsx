import React, { useState, useEffect } from 'react';

// --- CONSTANTS ---
const TABS = [
  'Strategic Overview',
  'Order of Battle',
  'Logistics & Metrics',
  'War Correspondence',
  'Historical Feature',
];

// All tabs use Explorer palette throughout.
const EXPLORER = {
  '--app-bg': '#e8dcc8',
  '--card-bg': '#1a1815',
  '--input-bg': '#26231f',
  '--brand': '#d4a574',
  '--text-body': '#2c2416',   // dark umber — for text ON app-bg (parchment)
  '--text-card': '#faf8f3',   // off-white  — for text ON card-bg (dark obsidian)
  '--text-muted': '#a89580',
  '--border': '#5a5041',
};

// --- MAIN COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Apply Explorer palette once at mount.
  useEffect(() => {
    Object.entries(EXPLORER).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  return (
    <>
      <style>{`
        body { transition: background-color 0.4s ease, color 0.4s ease; }
      `}</style>
      <div
        className="min-h-screen font-sans p-4 sm:p-8"
        style={{ backgroundColor: 'var(--app-bg)', color: 'var(--text-body)' }}
      >
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <header className="mb-8 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight uppercase" style={{ color: 'var(--text-body)' }}>
                  Operation Report: Fall of Fort Washington
                </h1>
                <p className="text-sm mt-2 font-mono" style={{ color: 'var(--text-body)' }}>
                  DATE: 16 NOVEMBER 1776 | LOCATION: MANHATTAN ISLAND, NY
                </p>
              </div>
              <div className="hidden sm:block">
                <span
                  className="inline-block px-3 py-1 rounded text-xs font-mono font-bold tracking-widest"
                  style={{ color: '#ef4444', border: '1px solid #991b1b' }}
                >
                  DEFEAT / COMPROMISED
                </span>
              </div>
            </div>
          </header>

          {/* TAB NAVIGATION */}
          <nav className="flex flex-wrap gap-2 mb-6 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
            {TABS.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className="px-4 py-2 text-sm font-medium rounded transition-colors duration-200"
                style={{
                  backgroundColor: activeTab === idx ? 'var(--card-bg)' : 'transparent',
                  color: activeTab === idx ? 'var(--brand)' : 'var(--border)',
                  border: '1px solid',
                  borderColor: activeTab === idx ? 'var(--border)' : 'transparent',
                }}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* TAB CONTENT — no background; inherits app-bg from outer wrapper */}
          <main className="rounded-lg p-6 min-h-[500px]" style={{ border: '1px solid var(--border)' }}>
            {activeTab === 0 && <StrategicOverview />}
            {activeTab === 1 && <OrderOfBattle />}
            {activeTab === 2 && <LogisticsMetrics />}
            {activeTab === 3 && <WarCorrespondence />}
            {activeTab === 4 && <HistoricalFeature />}
          </main>

        </div>
      </div>
    </>
  );
}

// --- TAB 1: STRATEGIC OVERVIEW ---
// Rule: body text uses --text-body (dark umber on parchment).
//       sidebar card uses --card-bg with --text-card (off-white on dark obsidian).
function StrategicOverview() {
  return (
    <div className="space-y-6">
      <h2
        className="text-2xl font-semibold pl-4"
        style={{ borderLeft: '4px solid var(--brand)', color: 'var(--text-body)' }}
      >
        Strategic Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        {/* Body prose — sits on app-bg, uses text-body */}
        <div className="col-span-2 space-y-4 leading-relaxed" style={{ color: 'var(--text-body)' }}>
          <p>
            The strategic logic underpinning the defense of Fort Washington was heavily flawed, rooted in a political desire to maintain a foothold in Manhattan rather than sound military doctrine. General George Washington recognized the untenable nature of the position following the Battle of White Plains, yet yielded to the optimistic assessments of General Nathanael Greene.
          </p>
          <p>
            The installation's primary objective — to act in tandem with Fort Lee to deny the Royal Navy uncontested navigation of the Hudson River — was nullified. British vessels had repeatedly demonstrated the ability to pass the forts' crossfire with acceptable damage thresholds.
          </p>
          <p>
            Tactically, the terrain was actively hostile to the defenders. Situated on the highest point of northern Manhattan, the rocky substrate precluded the excavation of adequate earthworks, defensive trenches, or an internal water reservoir.
          </p>
        </div>

        {/* Aside card — sits on card-bg (dark obsidian), uses text-card */}
        <div
          className="p-4 rounded text-sm font-mono space-y-4"
          style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }}
        >
          <div>
            <span className="block mb-1" style={{ color: 'var(--brand)' }}>TERRAIN CONSTRAINTS:</span>
            <ul className="list-disc pl-4 space-y-1" style={{ color: 'var(--text-card)' }}>
              <li>Rocky substrate limiting entrenchment.</li>
              <li>No internal potable water source.</li>
              <li>Steep exterior gradients vulnerable to combined assault.</li>
            </ul>
          </div>
          <div>
            <span className="block mb-1" style={{ color: 'var(--brand)' }}>WEATHER CONDITIONS:</span>
            <span style={{ color: 'var(--text-muted)' }}>Clear but frigid; late autumn conditions exacerbating exposure.</span>
          </div>
          <div>
            <span className="block mb-1" style={{ color: 'var(--brand)' }}>STRATEGIC VERDICT:</span>
            <span style={{ color: '#ef4444' }}>Critical Failure.</span>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- TAB 2: ORDER OF BATTLE ---
// Rule: all cards use card-bg / text-card. Section headers use input-bg.
//       Body label uses text-body. Accent border for Crown forces stays red (semantic).
function OrderOfBattle() {
  return (
    <div className="space-y-6">
      <h2
        className="text-2xl font-semibold pl-4"
        style={{ borderLeft: '4px solid var(--brand)', color: 'var(--text-body)' }}
      >
        Order of Battle
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">

        {/* Continental Army */}
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--card-bg)' }}>
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--input-bg)' }}>
            <h3 className="font-semibold" style={{ color: 'var(--brand)' }}>Continental Army (Defending)</h3>
          </div>
          <div className="p-4 space-y-4 font-mono text-sm">
            <div className="flex justify-between pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Commander</span>
              <span style={{ color: 'var(--text-card)' }}>Col. Robert Magaw</span>
            </div>
            <div className="flex justify-between pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Effective Strength</span>
              <span style={{ color: 'var(--text-card)' }}>~3,000 personnel</span>
            </div>
            <div className="mt-4">
              <span className="block mb-2" style={{ color: 'var(--text-muted)', textDecoration: 'underline', textDecorationColor: 'var(--border)' }}>Unit Breakdown:</span>
              <ul className="space-y-2">
                {['3rd Pennsylvania Battalion (Magaw\'s own)', '5th Pennsylvania Battalion', 'Rawlings\' Maryland and Virginia Riflemen', 'Various militia detachments'].map((unit, i) => (
                  <li key={i} className="pl-4" style={{ borderLeft: '2px solid var(--border)', color: 'var(--text-card)' }}>
                    <span className="font-medium">{unit}</span>
                    {i === 2 && <span className="block text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Positioned to defend the northern approach.</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Crown Forces */}
        <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--card-bg)' }}>
          <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)', backgroundColor: 'var(--input-bg)' }}>
            <h3 className="font-semibold" style={{ color: '#ef4444' }}>Crown Forces (Attacking)</h3>
          </div>
          <div className="p-4 space-y-4 font-mono text-sm">
            <div className="flex justify-between pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Commander-in-Chief</span>
              <span style={{ color: 'var(--text-card)' }}>Gen. William Howe</span>
            </div>
            <div className="flex justify-between pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Effective Strength</span>
              <span style={{ color: 'var(--text-card)' }}>~8,000 personnel</span>
            </div>
            <div className="mt-4">
              <span className="block mb-2" style={{ color: 'var(--text-muted)', textDecoration: 'underline', textDecorationColor: 'var(--border)' }}>Three-Pronged Assault Structure:</span>
              <ul className="space-y-4">
                {[
                  ['Northern Vector (Hessians)', 'Cmdr: Lt. Gen. Wilhelm von Knyphausen', 'Approx. 3,000 elite Hessian infantry; spearheaded the most brutal combat against Rawlings\' riflemen.'],
                  ['Southern Vector (British Regulars)', 'Cmdr: Lord Percy', 'Pinning force advancing up Manhattan.'],
                  ['Eastern Vector (Amphibious)', 'Cmdr: Gen. Cornwallis / Gen. Mathew', 'Crossing the Harlem River to flank American outworks.'],
                ].map(([title, cmdr, desc], i) => (
                  <li key={i} className="pl-4" style={{ borderLeft: '2px solid #7f1d1d' }}>
                    <span className="font-medium" style={{ color: 'var(--text-card)' }}>{title}</span>
                    <span className="block text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{cmdr}</span>
                    <span className="block text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- TAB 3: LOGISTICS & METRICS ---
// Rule: intro paragraph uses text-body (on parchment). All cards/table use card-bg + text-card.
function LogisticsMetrics() {
  const tableRows = [
    ['Artillery Pieces', '~43 operational cannons', '0 (All Captured)', 'Irreplaceable loss of heavy ordnance for the Continental Army.', 'red'],
    ['Small Arms / Musket Ammo', 'Adequate for 1-day engagement', 'Captured / Depleted', '2,800+ muskets seized by British quartermasters.', 'red'],
    ['Tents & Winter Camp Gear', 'Stockpiled within fort', 'All Seized', "Severely hindered Washington's ability to winter his remaining army.", 'red'],
    ['Water Supply', 'Critically Low (No interior well)', 'N/A', "Forced Magaw's early capitulation; a prolonged siege was impossible.", 'orange'],
  ];

  return (
    <div className="space-y-6">
      <h2
        className="text-2xl font-semibold pl-4"
        style={{ borderLeft: '4px solid var(--brand)', color: 'var(--text-body)' }}
      >
        Logistics & Post-Action Metrics
      </h2>

      {/* Intro — on app-bg, uses text-body */}
      <p className="text-sm mb-6" style={{ color: 'var(--text-body)' }}>
        Data-heavy analysis indicates a catastrophic collapse in supply line integrity prior to the engagement. Continental forces were geographically isolated with no viable line of retreat once Crown forces established control of the Harlem River and northern passes.
      </p>

      {/* Stat cards — on card-bg, use text-card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'US CASUALTIES (KILLED/WOUNDED)', value: '~155', color: 'var(--text-card)', sub: null },
          { label: 'US PERSONNEL CAPTURED', value: '2,838', color: '#ef4444', sub: 'Devastating loss of trained manpower' },
          { label: 'CROWN CASUALTIES (TOTAL)', value: '~458', color: 'var(--text-card)', sub: 'Majority sustained by Hessian Vanguard' },
        ].map(({ label, value, color, sub }, i) => (
          <div key={i} className="p-4 rounded-lg text-center" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }}>
            <span className="block text-xs font-mono mb-2" style={{ color: 'var(--text-muted)' }}>{label}</span>
            <span className="text-3xl font-bold" style={{ color }}>{value}</span>
            {sub && <span className="block text-xs mt-1" style={{ color, opacity: 0.7 }}>{sub}</span>}
          </div>
        ))}
      </div>

      <h3 className="text-lg font-medium mb-4" style={{ color: 'var(--text-body)' }}>Material Attrition & Logistics Throughput</h3>

      {/* Table — on card-bg, uses text-card */}
      <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full text-left text-sm font-mono border-collapse">
          <thead>
            <tr style={{ backgroundColor: 'var(--input-bg)', borderBottom: '1px solid var(--border)' }}>
              {['Asset Category', 'Pre-Battle Status', 'Post-Battle Status', 'Strategic Impact'].map(h => (
                <th key={h} className="p-3" style={{ color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableRows.map(([asset, pre, post, impact, highlight], i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'var(--card-bg)' : 'var(--input-bg)', borderBottom: '1px solid var(--border)' }}>
                <td className="p-3 font-medium" style={{ color: 'var(--text-card)' }}>{asset}</td>
                <td className="p-3" style={{ color: highlight === 'orange' && i === 3 ? '#f97316' : 'var(--text-muted)' }}>{pre}</td>
                <td className="p-3" style={{ color: highlight === 'red' ? '#ef4444' : 'var(--text-muted)' }}>{post}</td>
                <td className="p-3" style={{ color: 'var(--text-muted)' }}>{impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- TAB 4: WAR CORRESPONDENCE ---
// Explorer: outer wrapper uses card-bg. All text uses text-card / text-muted. Blockquotes use input-bg.
function WarCorrespondence() {
  return (
    <div
      className="space-y-6 animate-fade-in p-6 sm:p-10 rounded shadow-inner"
      style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }}
    >
      <h2 className="sr-only">War Correspondence</h2>
      <div className="font-mono space-y-6 uppercase tracking-wider text-sm leading-relaxed max-w-3xl mx-auto" style={{ color: 'var(--text-muted)' }}>
        <div className="pb-4 mb-8" style={{ borderBottom: '2px solid var(--border)', color: 'var(--text-muted)' }}>
          <p>+++ WIRE TRANSMISSION +++</p>
          <p>FROM: UNIDENTIFIED RIFLEMAN, MARYLAND BATTALION</p>
          <p>DATE: 16 NOV 1776, 1400 HOURS</p>
          <p>LOC: OUTWORKS, NORTH OF FORT WASHINGTON</p>
          <p>+++ MSG BEGINS +++</p>
        </div>
        <blockquote
          className="pl-6 py-2"
          style={{ borderLeft: '4px solid var(--border)', color: 'var(--text-card)', backgroundColor: 'var(--input-bg)' }}
        >
          "THEY ARE COMING UP THE GORGE. THE HESSIANS. YOU CAN HEAR THEIR BOOTS ON THE ROCKS BEFORE YOU SEE THE BLUE OF THEIR COATS. THE TREES ARE BARE, NO COVER LEFT. IT'S COLD. MY FINGERS ARE SO STIFF I CAN BARELY RAM THE CHARGE HOME."
        </blockquote>
        <p style={{ color: 'var(--text-muted)' }}>WE GAVE THEM HELL FOR TWO HOURS. RAWLINGS ORDERED US TO HOLD THE RIDGE. WE FIRED UNTIL THE BARRELS BLISTERED OUR HANDS. I SAW A DOZEN OF THEM FALL IN THE FIRST VOLLEY, BUT THEY JUST STEP OVER THEIR DEAD. THEY MOVE LIKE MACHINES. NO SHOUTING. JUST THE DRUMS AND THE BAYONETS CATCHING THE SUN.</p>
        <p style={{ color: 'var(--text-muted)' }}>MY POWDER HORN IS LIGHT. THE CANNON FROM THE FORT HAVE STOPPED. I THINK THEY ARE OUT OF AMMUNITION OR THE BRITISH FRIGATES HAVE SILENCED THEM. WE ARE RETREATING FALLING BACK TO THE MAIN FORTIFICATION.</p>
        <blockquote
          className="pl-6 py-2"
          style={{ borderLeft: '4px solid var(--border)', color: 'var(--text-card)', backgroundColor: 'var(--input-bg)' }}
        >
          "MAGAW IS FLYING THE FLAG, BUT HOW LONG CAN WE HOLD? THERE IS NO WATER. MEN ARE DRINKING FROM MUDDY PUDDLES IN THE TRENCHES. THE BRITISH ARE ACROSS THE HARLEM RIVER. WE ARE TRAPPED IN A BOX OF OUR OWN MAKING."
        </blockquote>
        <p style={{ color: 'var(--text-muted)' }}>I HEAR KNYPHAUSEN HAS SENT AN ENVOY UNDER A WHITE FLAG. THEY WANT US TO SURRENDER. IF WE DON'T, THEY WILL PUT US ALL TO THE SWORD. I DON'T WANT TO DIE IN THIS ROCKY HELL. I JUST WANT TO GO BACK TO BALTIMORE.</p>
        <div className="pt-4 mt-8" style={{ borderTop: '2px solid var(--border)', color: 'var(--text-muted)' }}>
          <p>+++ END OF MSG +++</p>
          <p>+++ SIGNAL LOST +++</p>
        </div>
      </div>
    </div>
  );
}

// --- TAB 5: HISTORICAL FEATURE ---
// Intentionally styled as a standalone newspaper/archival insert — cream background, serif type.
// This is a deliberate visual break from the Explorer palette, not an oversight.
function HistoricalFeature() {
  return (
    <div className="space-y-6 animate-fade-in bg-[#f4f1ea] text-neutral-900 p-8 sm:p-12 rounded shadow-lg max-w-4xl mx-auto border-4 border-double border-neutral-400">
      <header className="text-center mb-10 border-b-2 border-black pb-6">
        <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tighter uppercase mb-2">The Agony on the Hudson</h2>
        <p className="text-xl font-serif italic text-neutral-600">A Commander's Tears and a Fortress Fallen.</p>
        <div className="mt-4 flex items-center justify-center space-x-2 text-xs font-bold font-sans uppercase tracking-widest text-neutral-500">
          <span>By WarRoom Editorial</span><span>•</span><span>Archive Retrospective</span>
        </div>
      </header>
      <article className="prose prose-neutral prose-lg max-w-none font-serif leading-relaxed">
        <p className="first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-none">
          Across the gray, churning waters of the Hudson River, General George Washington stood on the palisades of Fort Lee, a spyglass pressed desperately to his eye. It was November 16, 1776, and he was watching his army bleed to death.
        </p>
        <p>On the opposite bank, the highest hill in northern Manhattan was wreathed in thick, white cannon smoke. Fort Washington, the last symbol of American defiance in New York, was being systematically dismantled. Inside its earthen and rocky walls, Colonel Robert Magaw and nearly three thousand Continental soldiers were trapped, fighting a hopeless battle against eight thousand professional British and Hessian troops.</p>
        <div className="my-10 border-y-4 border-black py-6 text-center bg-neutral-100">
          <p className="text-2xl md:text-3xl font-serif font-bold italic text-black max-w-2xl mx-auto leading-snug">
            "I would to God I had been there, and had been the first to fall."
          </p>
          <p className="text-sm font-sans font-bold uppercase tracking-widest mt-4 text-neutral-500">- APOCRYPHAL SENTIMENT ATTRIBUTED TO WASHINGTON</p>
        </div>
        <p>The tragedy of Fort Washington was not merely a military defeat; it was a failure of supreme command. Washington had known the fort was vulnerable. He had advised its evacuation. But he had allowed himself to be swayed by General Nathanael Greene, who believed the post could be held. It was a fatal hesitation.</p>
        <p>The assault was a masterpiece of 18th-century military engineering. General William Howe directed a three-pronged attack that slowly tightened a noose around Magaw's men. The fiercest fighting occurred to the north, where Maryland and Virginia riflemen under Colonel Moses Rawlings poured deadly fire into the advancing Hessian ranks led by General Wilhelm von Knyphausen. But the Hessians, relentless and disciplined, clambered over the rocky terrain, pushing the Americans back into the crowded, waterless confines of the main fort.</p>
        <p>By mid-afternoon, the situation was completely untenable. The American guns were silenced. Men were huddled together, exhausted, terrified, and out of ammunition. When Knyphausen sent an emissary demanding surrender, Magaw had no choice. To fight on meant the wholesale slaughter of his men.</p>
        <p>As the American flag was lowered and the striking colors of the Hessian regiments were raised over the bastions, it is said that Washington, watching from across the river, wept. In a single afternoon, he had lost nearly three thousand of his best men — a devastating blow that nearly extinguished the flame of the American Revolution before it had truly begun to burn. The long, bitter retreat across New Jersey was about to begin.</p>
      </article>
    </div>
  );
}
