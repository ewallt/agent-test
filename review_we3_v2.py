"""
Review WhiteboardExplainer-3 using the range slider to navigate frames.
"""
from playwright.sync_api import sync_playwright
import time

OUT = r"C:\Users\tomew\Documents\agent-test\review_screenshots"

# Scenes with approximate start frames (accounting for transition overlaps)
# title(90) | step(120-20) | diagram(120-20) | stat(100-20) | step2(150-20) |
# flow(180-20) | compare(130-20) | stat2(100-20) | quote(110-25) | step3(120-20) | outro(100-30)
CAPTURES = [
    (45,   "01-title"),
    (130,  "02-stepReveal-mid"),
    (250,  "03-diagramBuild-mid"),
    (370,  "04-stat-70min"),
    (470,  "05-stepReveal2-mid"),
    (620,  "06-flowChart-early"),
    (700,  "06-flowChart-late"),
    (820,  "07-compare"),
    (950,  "08-stat-85min"),
    (1060, "09-quote"),
    (1160, "10-stepReveal3-mid"),
    (1270, "11-outro"),
]

TOTAL_FRAMES = 1100  # approximate

def set_frame_js(page, frame_num, total):
    """Set frame via JS on the range input, dispatching React-compatible events."""
    page.evaluate(f"""() => {{
        const slider = document.querySelector('.__remotion-timeline-slider');
        if (!slider) return;
        const nativeInputSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype, 'value'
        ).set;
        nativeInputSetter.call(slider, {frame_num});
        slider.dispatchEvent(new Event('input', {{ bubbles: true }}));
        slider.dispatchEvent(new Event('change', {{ bubbles: true }}));
    }}""")
    time.sleep(0.8)

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        args=["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"]
    )
    page = browser.new_page(viewport={"width": 1400, "height": 850})

    page.goto("http://localhost:3002")
    page.wait_for_load_state("domcontentloaded")
    time.sleep(5)

    # Select WhiteboardExplainer-3
    page.locator("text=WhiteboardExplainer-3").first.click()
    time.sleep(3)

    # Get total frames from the composition
    total = page.evaluate("""() => {
        const slider = document.querySelector('.__remotion-timeline-slider');
        return slider ? parseInt(slider.max) : 1100;
    }""")
    print(f"Total frames: {total}")

    for frame_num, label in CAPTURES:
        try:
            set_frame_js(page, frame_num, total)
            path = f"{OUT}/{label}.png"
            page.screenshot(path=path)
            print(f"  Frame {frame_num}: {label}")
        except Exception as e:
            print(f"  Frame {frame_num} error: {e}")

    browser.close()
    print(f"\nDone. Screenshots in {OUT}")
