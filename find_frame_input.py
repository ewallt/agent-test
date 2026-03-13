"""Find the frame input selector in Remotion Studio."""
from playwright.sync_api import sync_playwright
import time, json

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--disable-gpu", "--no-sandbox"])
    page = browser.new_page(viewport={"width": 1280, "height": 800})

    page.goto("http://localhost:3002")
    page.wait_for_load_state("domcontentloaded")
    time.sleep(5)

    # Click WhiteboardExplainer-3
    page.locator("text=WhiteboardExplainer-3").first.click()
    time.sleep(3)

    # Dump all inputs
    inputs = page.evaluate("""() => {
        const inputs = document.querySelectorAll('input');
        return Array.from(inputs).map(i => ({
            type: i.type,
            name: i.name,
            value: i.value,
            placeholder: i.placeholder,
            'aria-label': i.getAttribute('aria-label'),
            id: i.id,
            className: i.className.substring(0, 60)
        }));
    }""")
    print(json.dumps(inputs, indent=2))

    # Take screenshot
    page.screenshot(path=r"C:\Users\tomew\Documents\agent-test\review_screenshots\dom_inspect.png")
    browser.close()
