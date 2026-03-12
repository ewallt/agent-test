"""
Review WhiteboardExplainer-3 by capturing screenshots at key frames in Remotion Studio.
"""
from playwright.sync_api import sync_playwright
import time

# Key frames to capture — one per scene type
# title=0, stepReveal=90, diagramBuild=210, stat=330, stepReveal2=430,
# flowChart=580, compare=760, stat2=890, quote=990, stepReveal3=1100, outro=1220
FRAMES = [
    (10,  "01-title"),
    (100, "02-stepReveal"),
    (220, "03-diagramBuild"),
    (340, "04-stat-70min"),
    (450, "05-stepReveal2"),
    (600, "06-flowChart-start"),
    (700, "06-flowChart-mid"),
    (780, "07-compare"),
    (900, "08-stat-85min"),
    (1000, "09-quote"),
    (1110, "10-stepReveal3"),
    (1230, "11-outro"),
]

OUT = r"C:\Users\tomew\Documents\agent-test\review_screenshots"

import os
os.makedirs(OUT, exist_ok=True)

def set_frame(page, frame_num):
    """Set the current frame by clicking the timeline at the right position,
    or by using the frame number input."""
    # Try all number inputs and find the frame one (shows current frame)
    inputs = page.locator('input[type="number"]').all()
    if inputs:
        inp = inputs[0]
        inp.click(click_count=3)
        inp.press("Control+a")
        inp.fill(str(frame_num))
        inp.press("Enter")
    else:
        # Fallback: click in the timeline proportionally
        timeline = page.locator('[data-timeline]').first
        timeline.click()
    time.sleep(0.5)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1600, "height": 900})

    # Navigate to the studio and select WhiteboardExplainer-3
    page.goto("http://localhost:3002")
    page.wait_for_load_state("domcontentloaded")
    time.sleep(4)

    # Take initial screenshot to see the UI
    page.screenshot(path=f"{OUT}/00-initial.png")
    print("Initial screenshot taken")

    # Try to find and click WhiteboardExplainer-3 in the sidebar
    we3 = page.locator("text=WhiteboardExplainer-3")
    if we3.count() > 0:
        we3.first.click()
        time.sleep(1.5)
        page.screenshot(path=f"{OUT}/00-selected.png")
        print("Clicked WhiteboardExplainer-3")
    else:
        print("Could not find WhiteboardExplainer-3 in sidebar")
        # Try navigating directly
        page.goto("http://localhost:3002/WhiteboardExplainer-3")
        page.wait_for_load_state("domcontentloaded")
        time.sleep(4)
        page.screenshot(path=f"{OUT}/00-direct-nav.png")

    # Now capture frames
    for frame_num, label in FRAMES:
        try:
            set_frame(page, frame_num)
            page.screenshot(path=f"{OUT}/{label}.png")
            print(f"  Frame {frame_num}: {label}")
        except Exception as e:
            print(f"  Frame {frame_num} error: {e}")

    browser.close()
    print(f"\nDone. Screenshots in {OUT}")
