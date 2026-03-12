/**
 * @selorax/ui — TypeScript type definitions
 */

// ---------------------------------------------------------------------------
// Core Types
// ---------------------------------------------------------------------------

/** A node in the UI tree that the host ExtensionRenderer interprets. */
export interface UINode {
  type: string;
  props: Record<string, any>;
  children?: UINode[];
}

// ---------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------

export type Action =
  | { type: 'navigate'; url: string }
  | { type: 'open_link'; url: string; external?: boolean }
  | { type: 'set_state'; key: string; value: any }
  | { type: 'call_backend'; url: string; method?: string; body?: any; onSuccess?: Action; onError?: Action }
  | { type: 'open_modal'; id: string }
  | { type: 'open_drawer'; id: string }
  | { type: 'close_modal' }
  | { type: 'close_drawer' }
  | { type: 'selorax_api'; url: string; method?: string; body?: any; onSuccess?: Action; onError?: Action };

// ---------------------------------------------------------------------------
// Component Props
// ---------------------------------------------------------------------------

// Layout
export interface CardProps {
  title?: string;
  subtitle?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

export interface StackProps {
  direction?: 'horizontal' | 'vertical';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
}

export interface GridProps {
  columns?: number;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface DividerProps {
  spacing?: 'sm' | 'md' | 'lg';
}

// Display
export interface TextProps {
  content: string;
  variant?: 'body' | 'caption' | 'code';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export interface HeadingProps {
  content: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  rounded?: boolean;
}

export interface BadgeProps {
  content: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export interface KeyValueProps {
  label: string;
  value: string | number;
}

export interface ListProps {
  items: Array<{
    label: string;
    description?: string;
    icon?: string;
    action?: Action;
  }>;
  ordered?: boolean;
}

export interface TableProps {
  columns: Array<{
    key: string;
    label: string;
    width?: string;
  }>;
  rows: Array<Record<string, any>>;
}

// Feedback
export interface AlertProps {
  title?: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
}

export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

// Actions
export interface ButtonProps {
  label: string;
  action: Action;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
}

export interface LinkProps {
  content: string;
  url: string;
  external?: boolean;
}

export interface ActionMenuProps {
  label: string;
  items: Array<{
    label: string;
    action: Action;
    icon?: string;
    destructive?: boolean;
  }>;
}

// Input
export interface TextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'number' | 'email' | 'password' | 'url';
  helpText?: string;
  error?: string;
}

export interface TextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  helpText?: string;
  error?: string;
}

export interface SelectProps {
  name: string;
  label?: string;
  options: Array<{ label: string; value: string }>;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  helpText?: string;
  error?: string;
}

export interface CheckboxProps {
  name: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  helpText?: string;
}

export interface ToggleProps {
  name: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  helpText?: string;
}

export interface DatePickerProps {
  name: string;
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  max?: string;
  helpText?: string;
  error?: string;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: Array<{ label: string; value: string; description?: string }>;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  helpText?: string;
  error?: string;
}

// Extended Layout
export interface BoxProps {
  padding?: string;
  background?: string;
  borderRadius?: string;
  className?: string;
}

export interface InlineStackProps {
  gap?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

export interface BlockStackProps {
  gap?: string;
  align?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

export interface InlineGridProps {
  columns?: number;
  gap?: string;
  className?: string;
}

export interface BleedProps {
  marginInline?: string;
  marginBlock?: string;
  className?: string;
}

export interface SeparatorProps {
  spacing?: 'sm' | 'md' | 'lg';
}

// Extended Display
export interface ThumbnailProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface BannerProps {
  title?: string;
  content?: string;
  status?: 'success' | 'warning' | 'critical' | 'info';
  dismissible?: boolean;
  className?: string;
}

export interface CalloutCardProps {
  title?: string;
  content?: string;
  illustration?: string;
  className?: string;
}

export interface EmptyStateProps {
  heading?: string;
  content?: string;
  image?: string;
  className?: string;
}

export interface TagProps {
  content?: string;
  label?: string;
  onRemove?: Action;
  className?: string;
}

export interface SkeletonBodyTextProps {
  lines?: number;
  className?: string;
}

export interface DescriptionListProps {
  items: Array<{ term: string; description: string }>;
  className?: string;
}

export interface MediaCardProps {
  title?: string;
  description?: string;
  src?: string;
  alt?: string;
  className?: string;
}

export interface FooterHelpProps {
  content?: string;
  className?: string;
}

// Extended Actions
export interface PageActionsProps {
  primaryAction?: {
    label: string;
    action?: Action;
    disabled?: boolean;
  };
  secondaryActions?: Array<{
    label: string;
    action?: Action;
  }>;
  className?: string;
}

// Resource
export interface ResourceListProps {
  className?: string;
}

export interface ResourceItemProps {
  name?: string;
  subtitle?: string;
  media?: string;
  action?: Action;
  shortcutActions?: Array<{
    label: string;
    action?: Action;
  }>;
  className?: string;
}

// Compound
export interface TabsProps {
  tabs: Array<{
    value: string;
    label: string;
    children: UINode[];
    icon?: string;
  }>;
  selected?: string;
}

export interface AccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: UINode | UINode[];
    defaultOpen?: boolean;
  }>;
  multiple?: boolean;
}

// Polaris-equivalent: Layout
export interface LayoutProps {
  className?: string;
}

export interface LayoutSectionProps {
  title?: string;
  description?: string;
  oneHalf?: boolean;
  oneThird?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export interface PageProps {
  title?: string;
  subtitle?: string;
  backAction?: Action;
  primaryAction?: { label: string; action?: Action };
  secondaryActions?: Array<{ label: string; action?: Action }>;
  className?: string;
}

export interface ButtonGroupProps {
  segmented?: boolean;
  className?: string;
}

export interface CollapsibleProps {
  open?: boolean;
  className?: string;
}

// Polaris-equivalent: Display
export interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface SkeletonPageProps {
  title?: boolean;
  className?: string;
}

export interface SkeletonDisplayTextProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface SkeletonThumbnailProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface VideoThumbnailProps {
  src?: string;
  thumbnailUrl?: string;
  onClick?: Action;
  className?: string;
}

export interface ExceptionListProps {
  items: Array<{
    icon?: string;
    status?: 'critical' | 'warning';
    title?: string;
    description?: string;
  }>;
  className?: string;
}

// Polaris-equivalent: Data / Filter
export interface IndexTableProps {
  headers: Array<{ label: string; key: string; sortable?: boolean }>;
  rows: Array<{ id: string | number; cells: Array<string | UINode>; selected?: boolean }>;
  selectable?: boolean;
  className?: string;
}

export interface DataTableProps {
  headers: string[];
  rows: string[][];
  totals?: string[];
  className?: string;
}

export interface FiltersProps {
  filters?: Array<{ key: string; label: string; value: string }>;
  query?: string;
  className?: string;
}

export interface PaginationProps {
  hasPrevious?: boolean;
  hasNext?: boolean;
  onPrevious?: Action;
  onNext?: Action;
  className?: string;
}

// Polaris-equivalent: Input
export interface AutocompleteProps {
  label?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  value?: string;
  bind?: string;
  className?: string;
}

export interface ColorPickerProps {
  label?: string;
  value?: string;
  bind?: string;
  className?: string;
}

export interface DropZoneProps {
  label?: string;
  accept?: string;
  helpText?: string;
  className?: string;
}

export interface RangeSliderProps {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  bind?: string;
  helpText?: string;
  className?: string;
}

// Polaris-equivalent: Overlay / Container
export interface PopoverProps {
  trigger?: UINode;
  className?: string;
}

export interface TooltipProps {
  content?: string;
  className?: string;
}

export interface ModalProps {
  id?: string;
  open?: string | boolean;
  title?: string;
  primaryAction?: Action;
  secondaryAction?: Action;
  className?: string;
}

export interface DrawerProps {
  id?: string;
  open?: string | boolean;
  title?: string;
  className?: string;
}

export interface SheetProps {
  title?: string;
  open?: boolean;
  className?: string;
}

export interface ScrollableProps {
  maxHeight?: string;
  className?: string;
}

export interface OptionListProps {
  title?: string;
  options?: Array<{ value: string; label: string }>;
  selected?: string[];
  allowMultiple?: boolean;
  className?: string;
}

// Polaris-equivalent: Feedback
export interface TruncateProps {
  content?: string;
  lines?: number;
  className?: string;
}

export interface TextStyleProps {
  variation?: 'positive' | 'negative' | 'strong' | 'subdued' | 'code';
  content?: string;
  className?: string;
}

// Polaris-equivalent: Navigation
export interface ListboxProps {
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
  selected?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component Builder Functions
// ---------------------------------------------------------------------------

// Layout
export function Card(props: CardProps, ...children: UINode[]): UINode;
export function Stack(props: StackProps, ...children: UINode[]): UINode;
export function Grid(props: GridProps, ...children: UINode[]): UINode;
export function Divider(props?: DividerProps): UINode;

// Display
export function Text(props: TextProps): UINode;
export function Heading(props: HeadingProps): UINode;
export function Image(props: ImageProps): UINode;
export function Badge(props: BadgeProps): UINode;
export function Icon(props: IconProps): UINode;
export function KeyValue(props: KeyValueProps): UINode;
export function List(props: ListProps): UINode;
export function Table(props: TableProps): UINode;

// Feedback
export function Alert(props: AlertProps, ...children: UINode[]): UINode;
export function Progress(props: ProgressProps): UINode;
export function Spinner(props?: SpinnerProps): UINode;

// Actions
export function Button(props: ButtonProps): UINode;
export function Link(props: LinkProps): UINode;
export function ActionMenu(props: ActionMenuProps): UINode;

// Input
export function TextField(props: TextFieldProps): UINode;
export function TextArea(props: TextAreaProps): UINode;
export function Select(props: SelectProps): UINode;
export function Checkbox(props: CheckboxProps): UINode;
export function Toggle(props: ToggleProps): UINode;
export function DatePicker(props: DatePickerProps): UINode;
export function RadioGroup(props: RadioGroupProps): UINode;

// Extended Layout
export function Separator(props?: SeparatorProps): UINode;
export function Box(props: BoxProps, ...children: UINode[]): UINode;
export function InlineStack(props: InlineStackProps, ...children: UINode[]): UINode;
export function BlockStack(props: BlockStackProps, ...children: UINode[]): UINode;
export function InlineGrid(props: InlineGridProps, ...children: UINode[]): UINode;
export function Bleed(props: BleedProps, ...children: UINode[]): UINode;

// Extended Display
export function Thumbnail(props: ThumbnailProps): UINode;
export function Banner(props: BannerProps, ...children: UINode[]): UINode;
export function CalloutCard(props: CalloutCardProps, ...children: UINode[]): UINode;
export function EmptyState(props: EmptyStateProps, ...children: UINode[]): UINode;
export function Tag(props: TagProps): UINode;
export function SkeletonBodyText(props?: SkeletonBodyTextProps): UINode;
export function DescriptionList(props: DescriptionListProps): UINode;
export function MediaCard(props: MediaCardProps, ...children: UINode[]): UINode;
export function FooterHelp(props: FooterHelpProps, ...children: UINode[]): UINode;

// Extended Actions
export function PageActions(props: PageActionsProps, ...children: UINode[]): UINode;

// Resource
export function ResourceList(props: ResourceListProps, ...children: UINode[]): UINode;
export function ResourceItem(props: ResourceItemProps, ...children: UINode[]): UINode;

// Compound
export function Tabs(props: TabsProps): UINode;
export function Accordion(props: AccordionProps): UINode;

// Polaris-equivalent: Layout
export function Layout(props: LayoutProps, ...children: UINode[]): UINode;
export function LayoutSection(props: LayoutSectionProps, ...children: UINode[]): UINode;
export function Page(props: PageProps, ...children: UINode[]): UINode;
export function ButtonGroup(props: ButtonGroupProps, ...children: UINode[]): UINode;
export function Collapsible(props: CollapsibleProps, ...children: UINode[]): UINode;

// Polaris-equivalent: Display
export function Avatar(props: AvatarProps): UINode;
export function SkeletonPage(props?: SkeletonPageProps): UINode;
export function SkeletonDisplayText(props?: SkeletonDisplayTextProps): UINode;
export function SkeletonThumbnail(props?: SkeletonThumbnailProps): UINode;
export function VideoThumbnail(props: VideoThumbnailProps): UINode;
export function ExceptionList(props: ExceptionListProps): UINode;

// Polaris-equivalent: Data / Filter
export function IndexTable(props: IndexTableProps, ...children: UINode[]): UINode;
export function DataTable(props: DataTableProps): UINode;
export function Filters(props: FiltersProps): UINode;
export function Pagination(props: PaginationProps): UINode;

// Polaris-equivalent: Input
export function Autocomplete(props: AutocompleteProps): UINode;
export function ColorPicker(props: ColorPickerProps): UINode;
export function DropZone(props: DropZoneProps): UINode;
export function RangeSlider(props: RangeSliderProps): UINode;

// Polaris-equivalent: Overlay / Container
export function Popover(props: PopoverProps, ...children: UINode[]): UINode;
export function Tooltip(props: TooltipProps, ...children: UINode[]): UINode;
export function Sheet(props: SheetProps, ...children: UINode[]): UINode;
export function Scrollable(props: ScrollableProps, ...children: UINode[]): UINode;
export function OptionList(props: OptionListProps): UINode;

// Polaris-equivalent: Feedback
export function Truncate(props: TruncateProps): UINode;
export function TextStyle(props: TextStyleProps): UINode;

// Polaris-equivalent: Navigation
export function Listbox(props: ListboxProps): UINode;

// Overlay — Modal & Drawer
export function Modal(props?: ModalProps, ...children: UINode[]): UINode;
export function Drawer(props?: DrawerProps, ...children: UINode[]): UINode;

// ---------------------------------------------------------------------------
// Selorax Global Object
// ---------------------------------------------------------------------------

export interface PickerResult<T = any> {
  selection: T | null;
}

export interface SeloraxModal {
  /** Open a modal in the host dashboard. */
  open(options: { title?: string; ui: UINode | UINode[] }): void;
  /** Close the currently open modal. */
  close(): void;
}

export interface PickerOptions {
  /** Allow selecting multiple items. Defaults to false. */
  multiple?: boolean;
}

export interface SeloraxPicker {
  /** Open the product picker. Resolves with the selected product(s) or null if cancelled. */
  product(options?: PickerOptions): Promise<any[] | null>;
  /** Open the customer picker. Resolves with the selected customer(s) or null if cancelled. */
  customer(options?: PickerOptions): Promise<any[] | null>;
  /** Open the order picker. Resolves with the selected order(s) or null if cancelled. */
  order(options?: PickerOptions): Promise<any[] | null>;
}

export interface SeloraxApi {
  /** Send a GET request through the host. */
  get(path: string): Promise<any>;
  /** Send a POST request through the host. */
  post(path: string, body?: any): Promise<any>;
  /** Send a PUT request through the host. */
  put(path: string, body?: any): Promise<any>;
  /** Send a PATCH request through the host. */
  patch(path: string, body?: any): Promise<any>;
  /** Send a DELETE request through the host. */
  delete(path: string): Promise<any>;
}

// ---------------------------------------------------------------------------
// App Bridge UI Types
// ---------------------------------------------------------------------------

export interface TitleBarConfig {
  title: string;
  breadcrumbs?: Array<{ label: string; url?: string }>;
  primaryAction?: { label: string };
  secondaryActions?: Array<{ label: string }>;
}

export interface SaveBarConfig {
  message?: string;
  saveAction?: { label?: string; disabled?: boolean; loading?: boolean };
  discardAction?: { label?: string; disabled?: boolean };
}

export interface SeloraxUI {
  /** Set the title bar for this extension. */
  titleBar(config: TitleBarConfig): void;
  /** Show the contextual save bar (unsaved changes indicator). */
  showSaveBar(config?: SaveBarConfig): void;
  /** Hide the contextual save bar. */
  hideSaveBar(): void;
  /** Show the full-width loading bar. */
  startLoading(): void;
  /** Complete and hide the loading bar. */
  completeLoading(): void;
}

// ---------------------------------------------------------------------------
// i18n Types
// ---------------------------------------------------------------------------

export interface SeloraxI18n {
  locale: string;
  _translations: Record<string, Record<string, any>>;
  setTranslations(translations: Record<string, Record<string, any>>): void;
  t(key: string, vars?: Record<string, string | number>): string;
}

// ---------------------------------------------------------------------------
// Metafields Types
// ---------------------------------------------------------------------------

export interface MetafieldValue {
  id: number;
  namespace: string;
  key: string;
  name: string;
  value: any;
  value_type: string;
  resource_type: string;
  resource_id: number;
  updated_at: string;
}

export interface SeloraxMetafields {
  get(resourceType: string, resourceId: string | number): Promise<MetafieldValue[]>;
  getValue(namespace: string, key: string, resourceType: string, resourceId: string | number): Promise<MetafieldValue | null>;
  set(data: { namespace: string; key: string; resource_type: string; resource_id: string | number; value: any }): Promise<any>;
  setMany(metafields: Array<{ namespace: string; key: string; resource_type: string; resource_id: string | number; value: any }>): Promise<any>;
  remove(namespace: string, key: string, resourceType: string, resourceId: string | number): Promise<void>;
}

// ---------------------------------------------------------------------------
// Billing Types
// ---------------------------------------------------------------------------

export interface SeloraxBilling {
  createCharge(data: { name: string; amount: number; currency?: string; return_url?: string }): Promise<any>;
  createSubscription(data: { name: string; amount: number; interval?: string; trial_days?: number; return_url?: string }): Promise<any>;
  getActive(): Promise<any[]>;
  getCharge(chargeId: string | number): Promise<any>;
  createUsageCharge(data: { description: string; amount: number; subscription_charge_id?: number }): Promise<any>;
  getWalletBalance(): Promise<any>;
  debitWallet(data: { amount: number; description: string; reference?: string }): Promise<any>;
}

// ---------------------------------------------------------------------------
// Webhooks Types
// ---------------------------------------------------------------------------

export interface SeloraxWebhooks {
  list(): Promise<any[]>;
  subscribe(data: { topic: string; url: string; format?: string }): Promise<any>;
  unsubscribe(subscriptionId: string | number): Promise<void>;
}

export interface Selorax {
  /** Read-only context from the host (store, user, page, etc.) */
  context: Record<string, any>;
  /** Merchant-configured settings for this extension */
  settings: Record<string, any>;
  /** Extension metadata (id, name, version, etc.) */
  extension: Record<string, any>;

  /** Send a UI tree to the host for rendering. */
  render(ui: UINode | UINode[]): void;
  /** Show a toast notification in the host dashboard. */
  toast(message: string, type?: 'success' | 'error' | 'warning'): void;

  /** Modal control */
  modal: SeloraxModal;
  /** Navigate within the dashboard (client-side route change). */
  navigate(url: string): void;
  /** Open an external link (new tab/window). */
  openLink(url: string): void;

  /** Resource pickers */
  picker: SeloraxPicker;
  /** Direct API access through the host */
  api: SeloraxApi;
  /** App Bridge UI controls (TitleBar, SaveBar, Loading) */
  ui: SeloraxUI;

  /** i18n — internationalization helpers */
  i18n: SeloraxI18n;
  /** Metafields — custom data on resources */
  metafields: SeloraxMetafields;
  /** Billing — app charges and subscriptions */
  billing: SeloraxBilling;
  /** Webhooks — event subscriptions */
  webhooks: SeloraxWebhooks;

  /** Signal to the host that the extension is ready. */
  ready(): void;
  /** Request the host to close/unmount this extension. */
  close(): void;

  /** Dispatch an action to the host dashboard. */
  dispatchAction(actionType: string, payload?: Record<string, any>): void;

  /**
   * Register a callback for context updates from the host.
   * @returns An unsubscribe function.
   */
  onContextUpdate(callback: (context: Record<string, any>) => void): () => void;

  /**
   * Register a callback for save bar actions (save/discard).
   * @returns An unsubscribe function.
   */
  onSaveBar(callback: (event: { action: 'save' | 'discard' }) => void): () => void;

  /**
   * Register a callback for title bar action clicks.
   * @returns An unsubscribe function.
   */
  onTitleBarAction(callback: (event: { action_type: 'primary' | 'secondary'; index?: number }) => void): () => void;

  /** Remove the global message listener. Call when tearing down. */
  _destroy(): void;
}

export const selorax: Selorax;

// ---------------------------------------------------------------------------
// Global augmentation — window.selorax
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    selorax: Selorax;
  }
}
