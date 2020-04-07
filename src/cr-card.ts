import translations from './translations';
import {
  CRCardLocale,
  CRCardRarity,
  CRCardLevel,
  CRCardType,
  CRCardCost,
  CRCardObservedAttribute,
} from './models';
import { CRCardProperty } from './cr-card-property';
import { waitForImage } from './helpers';

/**
 * `cr-card`
 * A custom element that automatically generates a Clash Royale card inside a canvas.
 *
 * Basic example:
 *
 * ```html
 * <cr-card
 *     card-name="Simple CR Card Demo"
 *     description="This really basic demo shows how easy it is to generate a Clash Royale card using Web Components.">
 *     <cr-card-property title="HP" value="100" icon="hp"></cr-card-property>
 * </cr-card>
 * ```
 *
 * View the element demo for a more advanced example.
 *
 * @customElement
 * @demo demo/index.html
 */
export class CRCard extends HTMLElement {
  /**
   * The language of the generated card.
   *
   * Supported languages:
   * - en (English)
   * - ja (Japanese)
   * - fr (French)
   * - de (German)
   * - es (Spanish)
   * - it (Italian)
   * - nl (Dutch)
   * - no (Norwegian)
   * - pt (Portuguese)
   * - tr (Turkish)
   * - ru (Russian)
   *
   * @return {string}
   */
  public get language(): CRCardLocale {
    return this.getAttribute('language') as CRCardLocale;
  }

  public set language(val: CRCardLocale) {
    this.setAttribute('language', val);
  }

  /**
   * The name of the card.
   *
   * @return {string}
   */
  public get name(): string {
    return this.getAttribute('name');
  }

  public set name(val: string) {
    this.setAttribute('name', val);
  }

  /**
   * The rarity of the card.
   *
   * Available rarities:
   * - common
   * - rare
   * - epic
   * - legendary
   *
   * @return {string}
   */
  public get rarity(): CRCardRarity {
    return this.getAttribute('rarity') as CRCardRarity;
  }

  public set rarity(val: CRCardRarity) {
    this.setAttribute('rarity', val);
  }

  /**
   * The level of the card.
   *
   * @return {number}
   */
  public get level(): CRCardLevel {
    return parseInt(this.getAttribute('level'), 10);
  }

  public set level(val: CRCardLevel) {
    this.setAttribute('level', val.toString());
  }

  /**
   * The type of the card.
   *
   * Available types:
   * - troop
   * - building
   * - spell
   *
   * @return {string}
   */
  public get type(): CRCardType {
    return this.getAttribute('type') as CRCardType;
  }

  public set type(val: CRCardType) {
    this.setAttribute('type', val);
  }

  /**
   * The cost of the card.
   *
   * @return {number}
   */
  public get cost(): CRCardCost {
    const cost = this.getAttribute('cost');
    const parsedCost = parseInt(cost, 10);
    return isNaN(parsedCost) ? cost : parsedCost;
  }

  public set cost(val: CRCardCost) {
    this.setAttribute('cost', val.toString());
  }

  /**
   * The description of the card.
   *
   * @return {string}
   */
  public get description(): string {
    return this.getAttribute('description');
  }

  public set description(val: string) {
    this.setAttribute('description', val);
  }

  /**
   * The image URL of the card.
   * It can also be a valid data URL (e.g. a base64 encoded image).
   *
   * @return {string}
   */
  public get image(): string {
    return this.getAttribute('image');
  }

  public set image(val: string) {
    this.setAttribute('image', val);
  }

  /**
   * The background color of the image.
   * It will be shown under the image when the image has some transparent areas or it isn't set at all.
   * Defaults to white if not set.
   *
   * @return {string}
   */
  public get imageBackgroundColor(): string {
    return this.getAttribute('image-background-color');
  }

  public set imageBackgroundColor(val: string) {
    this.setAttribute('image-background-color', val);
  }

  /**
   * If true, the card image will be stretched in the frame instead of being centered.
   *
   * @return {boolean}
   */
  public get stretchImage(): boolean {
    return this.hasAttribute('stretch-image');
  }

  public set stretchImage(val: boolean) {
    if (val) {
      this.setAttribute('stretch-image', '');
    } else {
      this.removeAttribute('stretch-image');
    }
  }

  /**
   * The assets base path. It is used to load all the assets needed
   * by the card (icons, shapes, etc.). For example, if you copy the content
   * of the `assets` directory into a `static` directory in the root of your
   * web server, you have to set the assets base path to `/static/` or to
   * `<your-website-url>/static/`.
   *
   * @return {string}
   */
  public get assetsPath(): string {
    return this.getAttribute('assets-path');
  }

  public set assetsPath(val: string) {
    this.setAttribute('assets-path', val);
  }

  public static readonly observedAttributes: CRCardObservedAttribute[] = [
    'language',
    'name',
    'rarity',
    'level',
    'type',
    'cost',
    'description',
    'image',
    'image-background-color',
    'stretch-image',
    'assets-path',
  ];

  public static readonly supportedLanguages: CRCardLocale[] = [
    CRCardLocale.EN,
    CRCardLocale.JA,
    CRCardLocale.FR,
    CRCardLocale.DE,
    CRCardLocale.ES,
    CRCardLocale.IT,
    CRCardLocale.NL,
    CRCardLocale.NO,
    CRCardLocale.PT,
    CRCardLocale.TR,
    CRCardLocale.RU,
  ];
  /* eslint-disable @typescript-eslint/camelcase */
  private static readonly _neededFonts = {
    SUPERCELL_MAGIC: 'Supercell Magic',
    SC_CCBACKBEAT: 'SC CCBackBeat',
  };

  private _isReady = false;
  private _isDrawing = false;
  private _assets = {
    background: new Image(),
    elixir: new Image(),
    info: new Image(),
  };
  private _properties = {
    area_damage: new Image(),
    boost: new Image(),
    common_cards: new Image(),
    count: new Image(),
    damage: new Image(),
    dark_elixir: new Image(),
    death_damage: new Image(),
    deploy_time: new Image(),
    dps: new Image(),
    elixir: new Image(),
    epic_cards: new Image(),
    gem: new Image(),
    gold: new Image(),
    hit_speed: new Image(),
    hp: new Image(),
    legendary_cards: new Image(),
    lifetime: new Image(),
    radius: new Image(),
    rage_fx: new Image(),
    range: new Image(),
    rare_cards: new Image(),
    shield_hp: new Image(),
    speed: new Image(),
    stun_duration: new Image(),
    target: new Image(),
    tower_damage: new Image(),
    transport: new Image(),
    troop: new Image(),
    trophy: new Image(),
    upgrade: new Image(),
  };
  /* eslint-enable @typescript-eslint/camelcase */
  private _frames = {
    normal: new Image(),
    legendary: new Image(),
  };
  private _image = new Image();
  private _canvasRef: HTMLCanvasElement;
  private _slotRef: HTMLSlotElement;
  private _context: CanvasRenderingContext2D;

  private readonly _template: HTMLTemplateElement;

  constructor() {
    super();

    this._template = document.createElement('template');
    this._template.innerHTML = `<!-- html -->
      <style>
        :host { display: inline-block; }
        canvas { width: 100%; height: auto; }
      </style>
      <canvas width="1319" height="1597"></canvas>
      <slot></slot>
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this._template.content.cloneNode(true));
  }

  /**
   * Draws the card in the internal canvas.
   *
   * This method is called automatically when a property of the card changes,
   * but you can also call it yourself to force the update of the canvas.
   */
  public async draw() {
    if (this._isDrawing || !this._isReady) {
      return;
    }

    this._isDrawing = true;

    this._drawBackground();

    this._drawCardImage();

    // this._drawElixirCost();

    this._isDrawing = false;
  }

  private _drawBackground() {
    // Background
    this._context.drawImage(
      this._assets.background,
      0,
      0,
      this._assets.background.width,
      this._assets.background.height,
    );
  }

  private _drawCardImage() {
    // Card image
    this._context.save();
    this._context.translate(72, 38);
    this._context.save();
    this._context.beginPath();

    // First of all, let's create the clip for the image based on the card rarity
    if (this.rarity === 'legendary') {
      this._context.moveTo(148, 5);
      this._context.lineTo(301, 63);
      this._context.lineTo(301, 357);
      this._context.lineTo(148, 415);
      this._context.lineTo(5, 357);
      this._context.lineTo(5, 63);
      this._context.clip();
    } else {
      this._context.moveTo(44, 14);
      this._context.lineTo(300, 14);
      this._context.quadraticCurveTo(330, 14, 330, 44);
      this._context.lineTo(330, 381);
      this._context.quadraticCurveTo(330, 411, 300, 411);
      this._context.lineTo(44, 411);
      this._context.quadraticCurveTo(14, 411, 14, 381);
      this._context.lineTo(14, 44);
      this._context.clip();
    }

    // Draw the image background
    this._context.fillStyle = this.imageBackgroundColor || '#fff';
    this._context.fillRect(0, 0, 320, 410);

    // Now we can finally draw the image
    if (this._image && this._image.src && this._image.complete) {
      if (this.stretchImage) {
        this._context.drawImage(this._image, 5, 5, 320, 410);
      } else {
        const ratio = Math.min(
          320 / this._image.width,
          410 / this._image.height,
        );
        this._context.drawImage(
          this._image,
          5 + (160 - (this._image.width * ratio) / 2),
          5 + (205 - (this._image.height * ratio) / 2),
          this._image.width * ratio,
          this._image.height * ratio,
        );
      }
    }
    this._context.restore();

    // Card frame
    const frame = this._frames[
      this.rarity === 'legendary' ? 'legendary' : 'normal'
    ];
    if (this.rarity === 'legendary') {
      // this._context.drawImage(frame, 0, 0, 306, 420);
    } else {
      this._context.drawImage(frame, 9, 9, 326, 407);
    }
    this._context.restore();
  }

  private _drawElixirCost() {
    this._context.save();

    // Elixir drop
    this._context.drawImage(this._assets.elixir, 48, 31, 88, 104);

    // Elixir value
    this._context.font = `60px "${CRCard._neededFonts.SUPERCELL_MAGIC}"`;
    this._context.textAlign = 'center';
    this._context.textBaseline = 'middle';
    this._context.lineWidth = 6;
    this._context.fillStyle = '#FFE9FF';
    this._context.strokeStyle = '#760088';
    this._context.shadowOffsetY = 5;
    this._context.shadowColor = '#760088';
    this._context.strokeText(`${this.cost}`, 92, 86);
    this._context.fillText(`${this.cost}`, 92, 86);

    this._context.restore();
  }

  private _drawProperty(property: CRCardProperty, x: number, y: number) {}

  /** @private */
  private connectedCallback() {
    this._canvasRef = this.shadowRoot.querySelector<HTMLCanvasElement>(
      'canvas',
    );
    this._slotRef = this.shadowRoot.querySelector<HTMLSlotElement>('slot');
    this._context = this._canvasRef.getContext('2d');
    this._slotRef.addEventListener('slotchange', () => this.draw());
  }

  /** @private */
  private async attributeChangedCallback(
    name: CRCardObservedAttribute,
    oldValue: string,
    newValue: string,
  ) {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case 'assets-path':
        await Promise.all([
          ...Object.entries(CRCard._neededFonts).map(
            async ([fontId, fontName]) => {
              for (const { family } of document.fonts.values()) {
                if (family === fontName) {
                  await document.fonts.ready;
                  return;
                }
              }

              const fontFace = new FontFace(
                fontName,
                `url(${newValue}/fonts/${fontId}.woff2)`,
              );

              await fontFace.load();

              document.fonts.add(fontFace);
            },
          ),
          ...(Object.keys(
            this._assets,
          ) as (keyof typeof CRCard.prototype._assets)[]).map(async (asset) => {
            const imagePromise = waitForImage(this._assets[asset]);
            this._assets[asset].src = `${this.assetsPath}/${asset}.png`;
            await imagePromise;
          }),
          ...(Object.keys(
            this._properties,
          ) as (keyof typeof CRCard.prototype._properties)[]).map(
            async (property) => {
              const imagePromise = waitForImage(this._properties[property]);
              this._properties[
                property
              ].src = `${this.assetsPath}/properties/${property}.png`;
              await imagePromise;
            },
          ),
          ...(Object.keys(
            this._frames,
          ) as (keyof typeof CRCard.prototype._frames)[]).map(async (frame) => {
            const imagePromise = waitForImage(this._frames[frame]);
            this._frames[frame].src = `${this.assetsPath}/frames/${frame}.png`;
            await imagePromise;
          }),
        ]);

        this._isReady = true;
        this.draw();
        break;
      case 'image':
        waitForImage(this._image).then(() => this.draw());
        this._image.src = newValue;
        break;
    }

    this.draw();
  }
}

window.customElements.define('cr-card', CRCard);
