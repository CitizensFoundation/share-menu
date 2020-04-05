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
    return cost === '?' ? '?' : parseInt(cost, 10);
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
    'stretch',
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
  private static readonly _fonts = ['SupercellMagic', 'SCCCBackBeat'];
  private static readonly _assets = ['background', 'elixir', 'info'];
  private static readonly _properties = [
    'area_damage',
    'boost',
    'common_cards',
    'count',
    'damage',
    'dark_elixir',
    'death_damage',
    'deploy_time',
    'dps',
    'elixir',
    'epic_cards',
    'gem',
    'gold',
    'hit_speed',
    'hp',
    'legendary_cards',
    'lifetime',
    'radius',
    'rage_fx',
    'range',
    'rare_cards',
    'shield_hp',
    'speed',
    'stun_duration',
    'target',
    'tower_damage',
    'transport',
    'troop',
    'trophy',
    'upgrade',
  ];
  private static readonly _frames = ['normal', 'legendary'];

  private _canvasRef: HTMLCanvasElement;
  private _slotRef: HTMLSlotElement;
  private _context: CanvasRenderingContext2D;
  private _assetsPromise: Promise<any>;

  private readonly _template: HTMLTemplateElement;

  constructor() {
    super();

    this._assetsPromise = Promise.all([]);

    this._template = document.createElement('template');
    this._template.innerHTML = `<!-- html -->
      <style>
        :host { display: inline-block; }
        canvas { width: 100%; height: auto; }
      </style>
      <canvas width="1432" height="1794"></canvas>
      <slot></slot>
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(this._template.content.cloneNode(true));
  }

  public async ready() {
    return this._assetsPromise ? await this._assetsPromise : false;
  }

  /**
   * Draws the card in the internal canvas.
   *
   * This method is called automatically when a property of the card changes,
   * but you can also call it yourself to force the update of the canvas.
   */
  public async draw() {
    await this.ready();
  }

  public _drawProperty(property: CRCardProperty, x: number, y: number) {}

  /** @private */
  private connectedCallback() {
    this._canvasRef = this.shadowRoot.querySelector<HTMLCanvasElement>(
      'canvas',
    );
    this._slotRef = this.shadowRoot.querySelector<HTMLSlotElement>('slot');
    this._context = this._canvasRef.getContext('2d');
    this._slotRef.addEventListener('slotchange', console.log);
  }

  /** @private */
  private attributeChangedCallback(
    name: CRCardObservedAttribute,
    oldValue: string,
    newValue: string,
  ) {
    if (oldValue === newValue) {
      return;
    }
    this.draw();
  }
}

window.customElements.define('cr-card', CRCard);
