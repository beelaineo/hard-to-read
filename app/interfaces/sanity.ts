import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Event
 *
 *
 */
export interface Event extends SanityDocument {
  _type: "event";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Date — `date`
   *
   *
   */
  date?: string;

  /**
   * End Date (optional) — `date`
   *
   *
   */
  end_date?: string;

  /**
   * Start time (optional) — `string`
   *
   *
   */
  start?: string;

  /**
   * End time (optional) — `string`
   *
   *
   */
  end?: string;

  /**
   * Timezone (optional) — `string`
   *
   *
   */
  timezone?: string;

  /**
   * Event type — `string`
   *
   *
   */
  event_type?: "event" | "exhibition";

  /**
   * Event program — `string`
   *
   *
   */
  event_program?: "hardtoread" | "pillowtalk";

  /**
   * Text — `blockContent`
   *
   *
   */
  text?: BlockContent;

  /**
   * Action label — `string`
   *
   *
   */
  action_label?: string;

  /**
   * Action link — `url`
   *
   *
   */
  action_link?: string;

  /**
   * Books and Collections — `array`
   *
   *
   */
  books?: Array<
    SanityKeyedReference<Book> | SanityKeyedReference<BookCollection>
  >;

  /**
   * Texts — `array`
   *
   *
   */
  texts?: Array<SanityKeyed<TextAttachment> | SanityKeyed<PdfAttachment>>;

  /**
   * Images — `array`
   *
   *
   */
  images?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * Videos — `array`
   *
   *
   */
  videos?: Array<SanityKeyed<MuxVideo>>;

  /**
   * Links — `array`
   *
   *
   */
  links?: Array<SanityKeyed<ExternalLink>>;

  /**
   * Persons — `array`
   *
   *
   */
  persons?: Array<SanityKeyedReference<Person>>;

  /**
   * Place — `reference`
   *
   *
   */
  place?: SanityReference<Place>;

  /**
   * Themes — `array`
   *
   *
   */
  themes?: Array<SanityKeyedReference<Theme>>;
}

/**
 * Person
 *
 *
 */
export interface Person extends SanityDocument {
  _type: "person";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Sort by Name (Last) — `string`
   *
   *
   */
  sortby_name?: string;

  /**
   * Link (optional) — `url`
   *
   *
   */
  link?: string;
}

/**
 * Place
 *
 *
 */
export interface Place extends SanityDocument {
  _type: "place";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Address — `text`
   *
   *
   */
  address?: string;

  /**
   * Location — `geopoint`
   *
   *
   */
  location?: SanityGeoPoint;

  /**
   * Link (optional) — `url`
   *
   *
   */
  link?: string;
}

/**
 * Blog
 *
 *
 */
export interface Post extends SanityDocument {
  _type: "post";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Themes — `array`
   *
   *
   */
  themes?: Array<SanityKeyedReference<Theme>>;

  /**
   * Published at — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;
}

/**
 * Book
 *
 *
 */
export interface Book extends SanityDocument {
  _type: "book";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Author — `string`
   *
   *
   */
  author?: string;

  /**
   * Reference to Person? — `array`
   *
   *
   */
  authorRef?: Array<SanityKeyedReference<Person>>;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Link — `url`
   *
   *
   */
  link?: string;

  /**
   * Date Published — `date`
   *
   *
   */
  date?: string;

  /**
   * PDF or Image (optional) — `file`
   *
   * Upload a PDF, PNG, or JPEG.
   */
  clipping?: { _type: "file"; asset: SanityReference<any> };
}

/**
 * Book Collection
 *
 *
 */
export interface BookCollection extends SanityDocument {
  _type: "bookCollection";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Subtitle — `string`
   *
   *
   */
  subtitle?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Place / Venue — `array`
   *
   *
   */
  place?: Array<SanityKeyedReference<Place>>;

  /**
   * Display Date — `string`
   *
   *
   */
  display_date?: string;

  /**
   * End Date (leave blank if ongoing) — `date`
   *
   *
   */
  date?: string;

  /**
   * Books — `array`
   *
   *
   */
  books?: Array<SanityKeyedReference<Book>>;
}

/**
 * Theme
 *
 *
 */
export interface Theme extends SanityDocument {
  _type: "theme";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };
}

/**
 * Press
 *
 *
 */
export interface Press extends SanityDocument {
  _type: "press";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Date — `date`
   *
   *
   */
  date?: string;

  /**
   * Publication — `string`
   *
   *
   */
  publication?: string;

  /**
   * Link — `url`
   *
   *
   */
  link?: string;

  /**
   * PDF or Image (optional) — `file`
   *
   * Upload a PDF, PNG, or JPEG press clipping (overrides link field).
   */
  clipping?: { _type: "file"; asset: SanityReference<any> };
}

/**
 * Partner
 *
 *
 */
export interface Partner extends SanityDocument {
  _type: "partner";

  /**
   * Name — `string`
   *
   *
   */
  title?: string;

  /**
   * Type — `string`
   *
   *
   */
  type?: "default" | "sponsor" | "fundraiser" | "venue";

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Associated Places — `array`
   *
   *
   */
  place?: Array<SanityKeyedReference<Place>>;

  /**
   * Link (optional) — `url`
   *
   *
   */
  link?: string;
}

/**
 * Home
 *
 *
 */
export interface Home extends SanityDocument {
  _type: "home";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Featured Content — `array`
   *
   *
   */
  content?: Array<
    | SanityKeyedReference<Event>
    | SanityKeyedReference<Person>
    | SanityKeyedReference<Place>
    | SanityKeyedReference<Post>
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      }>
    | SanityKeyed<MuxVideo>
    | SanityKeyedReference<Theme>
    | SanityKeyed<TextAttachment>
  >;
}

/**
 * Pop-ups
 *
 *
 */
export interface Popups extends SanityDocument {
  _type: "popups";

  /**
   * Events Page Pop-ups — `array`
   *
   *
   */
  events?: Array<
    | SanityKeyedReference<Event>
    | SanityKeyedReference<Person>
    | SanityKeyedReference<Place>
    | SanityKeyedReference<Post>
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      }>
    | SanityKeyed<MuxVideo>
    | SanityKeyedReference<Theme>
    | SanityKeyedReference<Press>
    | SanityKeyed<TextAttachment>
  >;

  /**
   * People Page Pop-ups — `array`
   *
   *
   */
  people?: Array<
    | SanityKeyedReference<Event>
    | SanityKeyedReference<Person>
    | SanityKeyedReference<Place>
    | SanityKeyedReference<Post>
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      }>
    | SanityKeyed<MuxVideo>
    | SanityKeyedReference<Theme>
    | SanityKeyedReference<Press>
    | SanityKeyed<TextAttachment>
  >;

  /**
   * Blog Page Pop-ups — `array`
   *
   *
   */
  blog?: Array<
    | SanityKeyedReference<Event>
    | SanityKeyedReference<Person>
    | SanityKeyedReference<Place>
    | SanityKeyedReference<Post>
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      }>
    | SanityKeyed<MuxVideo>
    | SanityKeyedReference<Theme>
    | SanityKeyedReference<Press>
    | SanityKeyed<TextAttachment>
  >;

  /**
   * Themes Page Pop-ups — `array`
   *
   *
   */
  themes?: Array<
    | SanityKeyedReference<Event>
    | SanityKeyedReference<Person>
    | SanityKeyedReference<Place>
    | SanityKeyedReference<Post>
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      }>
    | SanityKeyed<MuxVideo>
    | SanityKeyedReference<Theme>
    | SanityKeyedReference<Press>
    | SanityKeyed<TextAttachment>
  >;

  /**
   * Press Page Pop-ups — `array`
   *
   *
   */
  press?: Array<
    | SanityKeyedReference<Event>
    | SanityKeyedReference<Person>
    | SanityKeyedReference<Place>
    | SanityKeyedReference<Post>
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      }>
    | SanityKeyed<MuxVideo>
    | SanityKeyedReference<Theme>
    | SanityKeyedReference<Press>
    | SanityKeyed<TextAttachment>
  >;

  /**
   * Partners Page Pop-ups — `array`
   *
   *
   */
  partners?: Array<
    | SanityKeyedReference<Event>
    | SanityKeyedReference<Person>
    | SanityKeyedReference<Place>
    | SanityKeyedReference<Post>
    | SanityKeyed<{
        _type: "image";
        asset: SanityReference<SanityImageAsset>;
        crop?: SanityImageCrop;
        hotspot?: SanityImageHotspot;
      }>
    | SanityKeyed<MuxVideo>
    | SanityKeyedReference<Theme>
    | SanityKeyedReference<Press>
    | SanityKeyed<TextAttachment>
  >;
}

/**
 * Site Settings
 *
 *
 */
export interface SiteSettings extends SanityDocument {
  _type: "siteSettings";

  /**
   * Site Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Site Description — `text`
   *
   *
   */
  description?: string;

  /**
   * About Page — `blockContent`
   *
   *
   */
  about?: BlockContent;

  /**
   * Socials — `array`
   *
   *
   */
  socials?: Array<
    SanityKeyed<{
      /**
       * Social Channel — `string`
       *
       *
       */
      title?: string;

      /**
       * URL — `url`
       *
       *
       */
      url?: string;
    }>
  >;
}

export type BlockContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
>;

export type ExternalLink = {
  _type: "externalLink";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
};

export type TextAttachment = {
  _type: "textAttachment";
  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Body — `blockContent`
   *
   *
   */
  body?: BlockContent;
};

export type PdfAttachment = {
  _type: "pdfAttachment";
  asset: SanityReference<any>;
  /**
   * Title — `string`
   *
   *
   */
  title?: string;
};

export type Documents =
  | Event
  | Person
  | Place
  | Post
  | Book
  | BookCollection
  | Theme
  | Press
  | Partner
  | Home
  | Popups
  | SiteSettings;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type MuxVideo = any;
