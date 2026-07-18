"""Generate FitTrack app icons using Pillow."""
from PIL import Image, ImageDraw
import os

ASSETS_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "assets", "images")


def draw_weight_plate(draw, cx, cy, outer_r, inner_r, fill, thickness_ratio=0.08):
    """Draw a weight plate (circle with center hole + 3 small grip holes)."""
    # Outer ring
    draw.ellipse([cx - outer_r, cy - outer_r, cx + outer_r, cy + outer_r], fill=fill)
    # Center hole
    draw.ellipse([cx - inner_r, cy - inner_r, cx + inner_r, cy + inner_r], fill=None)
    # Three small grip holes
    grip_r = outer_r * 0.09
    grip_distance = (outer_r + inner_r) / 2
    for angle in [0, 120, 240]:
        import math
        gx = cx + grip_distance * math.cos(math.radians(angle))
        gy = cy + grip_distance * math.sin(math.radians(angle))
        draw.ellipse([gx - grip_r, gy - grip_r, gx + grip_r, gy + grip_r], fill=None)


def create_transparent_bg(size):
    """Create RGBA image with transparent background."""
    return Image.new("RGBA", (size, size), (0, 0, 0, 0))


def create_solid_bg(size, color):
    """Create RGBA image with solid background."""
    return Image.new("RGBA", (size, size), color)


def render_splash_icon(size=400):
    """Render the splash icon - white weight plate with transparency."""
    img = create_transparent_bg(size)
    draw = ImageDraw.Draw(img)
    margin = size * 0.12
    outer_r = (size - 2 * margin) / 2
    cx = cy = size / 2
    inner_r = outer_r * 0.4
    draw_weight_plate(draw, cx, cy, outer_r, inner_r, (255, 255, 255, 230))
    return img


def render_app_icon(size=1024):
    """Render the app icon - weight plate on dark gradient background."""
    # Dark background (deep navy/slate)
    bg_color = (17, 24, 39, 255)  # Very dark gray-blue
    img = create_solid_bg(size, bg_color)
    draw = ImageDraw.Draw(img)

    # Subtle accent circle behind the weight plate
    cx = cy = size / 2
    accent_r = size * 0.42
    accent_color = (34, 211, 238, 40)  # Cyan with low opacity
    draw.ellipse([cx - accent_r, cy - accent_r, cx + accent_r, cy + accent_r],
                 fill=accent_color)

    # Weight plate in bright cyan/teal
    margin = size * 0.22
    outer_r = (size - 2 * margin) / 2
    inner_r = outer_r * 0.4
    plate_color = (34, 211, 238, 255)  # Cyan-500
    draw_weight_plate(draw, cx, cy, outer_r, inner_r, plate_color)
    return img


def render_adaptive_foreground(size=1080):
    """Android adaptive icon foreground - weight plate on transparent."""
    img = create_transparent_bg(size)
    draw = ImageDraw.Draw(img)
    margin = size * 0.20
    outer_r = (size - 2 * margin) / 2
    cx = cy = size / 2
    inner_r = outer_r * 0.38
    plate_color = (34, 211, 238, 255)
    draw_weight_plate(draw, cx, cy, outer_r, inner_r, plate_color)
    return img


def render_adaptive_background(size=1080):
    """Android adaptive icon background - solid dark color."""
    return create_solid_bg(size, (17, 24, 39, 255))


def render_adaptive_monochrome(size=1080):
    """Android adaptive monochrome icon - white weight plate on dark."""
    img = create_solid_bg(size, (17, 24, 39, 255))
    draw = ImageDraw.Draw(img)
    margin = size * 0.20
    outer_r = (size - 2 * margin) / 2
    cx = cy = size / 2
    inner_r = outer_r * 0.38
    draw_weight_plate(draw, cx, cy, outer_r, inner_r, (255, 255, 255, 255))
    return img


def render_favicon(size=48):
    """Small favicon."""
    img = create_transparent_bg(size)
    draw = ImageDraw.Draw(img)
    margin = size * 0.15
    outer_r = (size - 2 * margin) / 2
    cx = cy = size / 2
    inner_r = outer_r * 0.35
    draw_weight_plate(draw, cx, cy, outer_r, inner_r, (34, 211, 238, 255))
    return img


def main():
    os.makedirs(ASSETS_DIR, exist_ok=True)

    print("Generating splash icon...")
    splash = render_splash_icon(400)
    splash.save(os.path.join(ASSETS_DIR, "splash-icon.png"))
    print(f"  -> {os.path.join(ASSETS_DIR, 'splash-icon.png')} ({splash.size})")

    print("Generating app icon...")
    icon = render_app_icon(1024)
    icon.save(os.path.join(ASSETS_DIR, "icon.png"))
    print(f"  -> {os.path.join(ASSETS_DIR, 'icon.png')} ({icon.size})")

    print("Generating Android adaptive icons...")
    fg = render_adaptive_foreground(1080)
    fg.save(os.path.join(ASSETS_DIR, "android-icon-foreground.png"))
    print(f"  -> foreground ({fg.size})")

    bg = render_adaptive_background(1080)
    bg.save(os.path.join(ASSETS_DIR, "android-icon-background.png"))
    print(f"  -> background ({bg.size})")

    mc = render_adaptive_monochrome(1080)
    mc.save(os.path.join(ASSETS_DIR, "android-icon-monochrome.png"))
    print(f"  -> monochrome ({mc.size})")

    print("Generating favicon...")
    fv = render_favicon(48)
    fv.save(os.path.join(ASSETS_DIR, "favicon.png"))
    print(f"  -> {os.path.join(ASSETS_DIR, 'favicon.png')} ({fv.size})")

    print("\nDone! All icons generated.")


if __name__ == "__main__":
    main()
