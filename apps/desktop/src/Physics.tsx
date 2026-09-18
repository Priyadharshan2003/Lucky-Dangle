// Reverse-engineered Pt class and Charms from luckydangle.app

export const D = {
  count: 12,
  segment: 15.5,
  rest: 170.5,
  hangY: -4,
  stations: [34, 24, 15]
};

export const vt = {
  white: { light: "#ffffff", mid: "#ebebf0", dark: "#9ea1ad", rim: "rgba(255,255,255,0.35)" },
  gold: { light: "#ffe685", mid: "#edb52e", dark: "#9e6b0a", rim: "rgba(255,217,102,0.45)" },
  deepBlue: { light: "#6b8ce0", mid: "#294294", dark: "#0a1447", rim: "rgba(128,166,255,0.45)" },
  lacquerRed: { light: "#ff7a66", mid: "#d4211a", dark: "#6b050a", rim: "rgba(255,115,89,0.45)" },
  faience: { light: "#9ef0e3", mid: "#29a69e", dark: "#084f54", rim: "rgba(140,242,230,0.45)" },
  stripedRed: { light: "#fa7354", mid: "#cc2417", dark: "#700808", rim: "rgba(255,115,77,0.45)" },
  eyeBlue: { light: "#477af2", mid: "#2140bf", dark: "#0a146b", rim: "rgba(140,191,255,0.40)" },
  rose: { light: "#ff9ed9", mid: "#ed409e", dark: "#8c0f54", rim: "rgba(255,140,204,0.45)" }
};

// @ts-nocheck
export const k = {
  chiliSizes: [[65.2, 16.2], [66, 8.2], [55.6, 11.3], [57.8, 12.1], [42.3, 11.3], [56.8, 10.1], [59.1, 9]],
  lemon: [44, 48.6],
  coal: [21, 18.8],
  coalDrop: 28,
  slotSprite: [1, 4, 2, 6, 0, 3, 5],
  slotJitter: [.08, -.12, .05, -.08, .13, -.05, .1],
  slots: [.61, .65, .69, .73, .77, .81, .85]
};

export const dt = [{
  slug: "nazar",
  name: "Nazar boncuğu",
  origin: "Turkey and the Mediterranean",
  description: "A glass eye worn against the evil eye. Give it a flick when you want a little cover.",
  ritual: { kind: "flick", label: "Give it a flick" },
  art: { type: "image", src: "/charms/nazar.png", frame: [64, 64] },
  attach: .15,
  hangOffset: 22.4,
  beads: { small: "glass:white", big: "eye", raise: 0, bigSize: 12 }
}, {
  slug: "hamsa",
  name: "Hamsa",
  origin: "Middle East and North Africa",
  description: "An open hand carried for protection and good fortune. Give it a flick to send bad luck on its way.",
  ritual: { kind: "flick", label: "Give it a flick" },
  art: { type: "image", src: "/charms/hamsa.png", frame: [64, 84] },
  attach: .12,
  hangOffset: 32,
  beads: { small: "glass:gold", big: "glass:deepBlue", raise: 0, bigSize: 12 }
}, {
  slug: "nimbu-mirchi",
  name: "Nimbu-mirchi",
  origin: "India",
  description: "Seven chilies and a lemon hung at the threshold to turn away misfortune. Replace it with a fresh one when the week is up.",
  ritual: { kind: "garland", label: "Hang a fresh garland" },
  art: { type: "garland" },
  attach: .5,
  hangOffset: 0,
  beads: null
}, {
  slug: "ghanta",
  name: "Ghanta",
  origin: "India",
  description: "A bell rung to clear the air and mark a beginning. Ring it when you make a wish, or before something that matters.",
  ritual: { kind: "ghanta", label: "Ring the bell" },
  art: { type: "image", src: "/charms/ghanta.png", frame: [64, 84] },
  attach: .073,
  hangOffset: 35.9,
  cordEnd: { kind: "tip", from: [32, 5.6], to: [32, 12.6] },
  beads: { small: "glass:gold", big: "glass:lacquerRed", raise: 0, bigSize: 12 }
}, {
  slug: "drishti-bommai",
  name: "Drishti bommai",
  origin: "South India",
  description: "A fierce guardian painted to meet the first bad glance. Repaint it through seven colors whenever you want a fresh start.",
  ritual: { kind: "drishti", label: "Repaint the guardian" },
  art: { type: "image", src: "/charms/drishti-bommai.png", frame: [64, 84] },
  attach: .13,
  hangOffset: 31.1,
  beads: { small: "glass:gold", big: "striped", raise: 4, bigSize: 12 }
}, {
  slug: "chinese-knot",
  name: "Páncháng jié",
  origin: "China",
  description: "One unbroken red cord tied for good fortune without end. Cinch it gently and let the tassel settle.",
  ritual: { kind: "knot", label: "Tie in good fortune" },
  art: { type: "image", src: "/charms/chinese-knot.png", frame: [64, 84] },
  attach: .045,
  hangOffset: 38.2,
  cordEnd: { kind: "binding", center: [32, 4.3] },
  beads: { small: "glass:lacquerRed", big: "glass:gold", raise: 0, bigSize: 12 }
}, {
  slug: "daruma",
  name: "Daruma",
  origin: "Japan",
  description: "A wishing doll for goals that take some grit. Paint one eye when you make a wish and the other when it comes true.",
  ritual: { kind: "daruma", label: "Make a wish" },
  art: { type: "image", src: "/charms/daruma.png", frame: [64, 64] },
  attach: .14,
  hangOffset: 23,
  beads: { small: "glass:gold", big: "glass:white", raise: 0, bigSize: 12 }
}, {
  slug: "maneki-neko",
  name: "Maneki-neko",
  origin: "Japan",
  description: "A beckoning cat that invites good fortune in. Call on it and watch its raised paw wave.",
  ritual: { kind: "maneki", label: "Beckon good fortune" },
  art: { type: "image", src: "/charms/maneki-neko.png", frame: [64, 84] },
  attach: .13,
  hangOffset: 31.1,
  beads: { small: "glass:gold", big: "glass:lacquerRed", raise: 4, bigSize: 12 }
}, {
  slug: "horseshoe",
  name: "Horseshoe",
  origin: "Europe and the Americas",
  description: "Hung points up so the luck stays put. A good flick is all this one needs.",
  ritual: { kind: "flick", label: "Give it a flick" },
  art: { type: "image", src: "/charms/horseshoe.png", frame: [64, 84] },
  attach: .12,
  hangOffset: 31.9,
  cordEnd: { kind: "tip", from: [32.2, 9.7], to: [32.2, 14.3] },
  beads: { small: "hexnut", big: "horsehead", raise: 0, bigSize: 20 }
}, {
  slug: "scarab",
  name: "Scarab",
  origin: "Ancient Egypt",
  description: "An ancient amulet for renewal and new beginnings. Spread its ceremonial wings for a moment, then let them rest.",
  ritual: { kind: "scarab", label: "Spread the wings" },
  art: { type: "image", src: "/charms/scarab.png", frame: [140.5, 107] },
  attach: .184,
  hangOffset: 33.8,
  cordEnd: { kind: "tip", from: [70.25, 19.2], to: [70.25, 25] },
  beads: { small: "glass:gold", big: "glass:faience", raise: 4, bigSize: 12 }
}, {
  slug: "himmeli",
  name: "Himmeli",
  origin: "Finland",
  description: "A rye-straw tradition for inviting abundance, prosperity, and a fruitful flow of work. Set its open geometry turning on an imagined current of air.",
  ritual: { kind: "himmeli", label: "Set it turning" },
  art: { type: "image", src: "/charms/himmeli.png", frame: [64, 84] },
  attach: .05,
  hangOffset: 37.8,
  beads: null
}, {
  slug: "custom",
  name: "Emoji",
  origin: "Yours",
  description: "Choose any emoji and make the ritual your own. Hang the one that feels lucky to you.",
  ritual: { kind: "emoji", label: "Pick an emoji" },
  art: { type: "emoji", glyph: "🍀", frame: [64, 64], fontSize: 58 },
  attach: .15,
  hangOffset: 22.4,
  beads: { small: "glass:white", big: "emojiTwin", raise: 0, bigSize: 14 }
}];

const p = D.count;
const nt = D.segment;
const Bt = D.hangY;
const C = -260.5;
const L = 1 / 120;
const Dt = .3;

export class Pt {
  hangOffset = 0;
  segmentScale = 1;
  random = Math.random;
  anchorX = 0;
  anchorY = C;
  anchorXTarget = null;
  minAX = 90;
  maxAX = 1e3;
  dropEase = .08;
  pts = Array.from({ length: p }, (n, a) => ({
    x: 0,
    y: C + a * nt,
    px: 0,
    py: C + a * nt
  }));
  dangled = false;
  dragging = false;
  dragTarget = null;
  mouse = null;
  lastMouse = null;
  mVX = 0;
  mVY = 0;
  elapsed = 0;
  dipRemaining = 0;
  dipY = 0;
  liftT = -1;
  liftFromY = 0;
  onAnchorSlide = null;

  constructor({ hangOffset = 0, segmentScale = 1, random = Math.random } = {}) {
    this.hangOffset = hangOffset;
    this.segmentScale = segmentScale;
    this.random = random;
  }

  get end() {
    return this.pts[p - 1];
  }

  get seg() {
    return nt * this.segmentScale;
  }

  get rest() {
    return this.seg * (p - 1);
  }

  get maxLen() {
    return this.rest * 1.4;
  }

  hangTarget() {
    return Bt - this.hangOffset;
  }

  endAngle() {
    const t = this.pts[p - 2],
      i = this.pts[p - 1];
    return Math.atan2(i.x - t.x, i.y - t.y);
  }

  staticRest() {
    this.anchorY = this.hangTarget();
    const t = this.seg;
    for (let i = 0; i < p; i++) {
      const s = this.pts[i];
      s.x = s.px = this.anchorX;
      s.y = s.py = this.anchorY + i * t;
    }
  }

  flick() {
    this.end.px += (18 + this.random() * 8) * (this.random() < .5 ? 1 : -1);
  }

  setDangled(t) {
    if (t !== this.dangled) {
      this.dangled = t;
      if (t) {
        this.dipRemaining = 0;
        this.liftT = -1;
        this.flick();
      } else {
        this.dipRemaining = .18;
        this.dipY = this.anchorY + 16;
      }
    }
  }

  dragTo(t) {
    const i = t.x - this.anchorX,
      s = t.y - this.anchorY,
      n = Math.max(Math.hypot(i, s), 1),
      a = Math.min(Math.max(n - this.hangOffset, 1), this.maxLen);
    this.dragTarget = {
      x: this.anchorX + i / n * a,
      y: this.anchorY + s / n * a
    };
  }

  interpolated(t) {
    const s = (this.pts.length - 1) * t;
    const n = Math.floor(s);
    const a = s - n;
    
    if (n >= this.pts.length - 1) {
      const last = this.pts[this.pts.length - 1];
      const prev = this.pts[this.pts.length - 2];
      return {
        x: last.x,
        y: last.y,
        angle: Math.atan2(last.x - prev.x, last.y - prev.y)
      };
    }
    
    const curr = this.pts[n];
    const next = this.pts[n + 1];
    
    return {
      x: curr.x + (next.x - curr.x) * a,
      y: curr.y + (next.y - curr.y) * a,
      angle: Math.atan2(next.x - curr.x, next.y - curr.y)
    };
  }

  step() {
    const t = this.pts,
      i = this.end;
    this.elapsed += L;
    if (this.anchorXTarget !== null && !this.dragging) {
      const a = this.anchorXTarget - this.anchorX;
      this.anchorX += Math.max(-3.6, Math.min(3.6, a * .02));
      if (Math.abs(this.anchorXTarget - this.anchorX) < .5) {
        this.anchorX = this.anchorXTarget;
      }
    }
    if (this.dangled) {
      this.liftT = -1;
      const a = this.hangTarget();
      this.anchorY += (a - this.anchorY) * this.dropEase;
      if (Math.abs(this.anchorY - a) < .5) {
        this.anchorY = a;
      }
    } else if (this.dipRemaining > 0) {
      this.dipRemaining -= L;
      this.anchorY += (this.dipY - this.anchorY) * .15;
      if (this.dipRemaining <= 0) {
        this.liftT = 0;
        this.liftFromY = this.anchorY;
      }
    } else if (this.liftT >= 0) {
      this.liftT += L;
      const a = Math.min(this.liftT / Dt, 1),
        o = a * a * (3 - 2 * a);
      this.anchorY = this.liftFromY + (C - this.liftFromY) * o;
      if (a >= 1) {
        this.liftT = -1;
      }
    }
    const s = .0035 * Math.sin(this.elapsed * .55) + .002 * Math.sin(this.elapsed * 1.3 + .8);
    for (let a = 1; a < p; a++) {
      const o = t[a],
        d = (o.x - o.px) * .98,
        c = (o.y - o.py) * .98;
      o.px = o.x;
      o.py = o.y;
      o.x += d + s * (a / (p - 1));
      o.y += c + .125;
    }
    if (this.mouse && !this.dragging) {
      if (this.lastMouse) {
        this.mVX = this.mVX * .75 + (this.mouse.x - this.lastMouse.x) * .25;
        this.mVY = this.mVY * .75 + (this.mouse.y - this.lastMouse.y) * .25;
      }
      this.lastMouse = this.mouse;
      const a = this.endAngle(),
        o = i.x + this.hangOffset * Math.sin(a),
        d = i.y + this.hangOffset * Math.cos(a),
        c = o - this.mouse.x,
        h = d - this.mouse.y,
        g = Math.hypot(c, h),
        b = 40;
      if (g < b && g > .5) {
        const u = (b - g) / b,
          x = u * u * .4,
          y = u * .1,
          Y = c / g * x + Math.max(-14, Math.min(14, this.mVX)) * y,
          O = h / g * x + Math.max(-14, Math.min(14, this.mVY)) * y;
        i.x += Y;
        i.y += O * .35;
      }
      for (let u = 1; u < p - 2; u++) {
        const x = t[u],
          y = x.x - this.mouse.x,
          Y = x.y - this.mouse.y,
          O = y * y + Y * Y;
        if (O < 1600 && O > 1) {
          const at = Math.sqrt(O),
            pt = (40 - at) / 40 * .8;
          x.x += y / at * pt;
          x.y += Y / at * pt;
        }
      }
    } else {
      this.lastMouse = null;
      this.mVX = 0;
      this.mVY = 0;
    }
    if (this.dragging && this.dragTarget && this.dragTarget.y < 60) {
      this.anchorX += (this.dragTarget.x - this.anchorX) * .12;
      this.anchorX = Math.min(Math.max(this.anchorX, this.minAX), this.maxAX);
      if (this.onAnchorSlide) this.onAnchorSlide(this.anchorX);
    }
    const n = this.seg;
    for (let a = 0; a < 5; a++) {
      t[0].x = this.anchorX;
      t[0].y = this.anchorY;
      if (this.dragging && this.dragTarget) {
        i.x = this.dragTarget.x;
        i.y = this.dragTarget.y;
      }
      for (let o = 0; o < p - 1; o++) {
        const d = t[o],
          c = t[o + 1],
          h = c.x - d.x,
          g = c.y - d.y,
          b = Math.max(Math.hypot(h, g), 1e-4),
          u = (b - n) / b / 2,
          x = h * u,
          y = g * u;
        if (o === 0) {
          c.x -= x * 2;
          c.y -= y * 2;
        } else if (this.dragging && o === p - 2) {
          d.x += x * 2;
          d.y += y * 2;
        } else {
          d.x += x;
          d.y += y;
          c.x -= x;
          c.y -= y;
        }
      }
    }
  }
}
// @ts-nocheck
