'use strict';

/**
 * @selorax/ui — Component builder functions
 *
 * Each function returns a plain JSON node { type, props, children }
 * that the host ExtensionRenderer can interpret and render.
 * Zero dependencies — pure data builders.
 */

function createElement(type, props, children) {
  var flatChildren =
    children && children.length > 0
      ? children.flat().filter(Boolean)
      : undefined;

  return {
    type: type,
    props: props || {},
    children:
      flatChildren && flatChildren.length > 0 ? flatChildren : undefined,
  };
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

exports.Card = function Card(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Card', props, children);
};

exports.Stack = function Stack(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Stack', props, children);
};

exports.Grid = function Grid(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Grid', props, children);
};

exports.Divider = function Divider(props) {
  return createElement('Divider', props);
};

// ---------------------------------------------------------------------------
// Display
// ---------------------------------------------------------------------------

exports.Text = function Text(props) {
  return createElement('Text', props);
};

exports.Heading = function Heading(props) {
  return createElement('Heading', props);
};

exports.Image = function Image(props) {
  return createElement('Image', props);
};

exports.Badge = function Badge(props) {
  return createElement('Badge', props);
};

exports.Icon = function Icon(props) {
  return createElement('Icon', props);
};

exports.KeyValue = function KeyValue(props) {
  return createElement('KeyValue', props);
};

exports.List = function List(props) {
  return createElement('List', props);
};

exports.Table = function Table(props) {
  return createElement('Table', props);
};

// ---------------------------------------------------------------------------
// Feedback
// ---------------------------------------------------------------------------

exports.Alert = function Alert(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Alert', props, children);
};

exports.Progress = function Progress(props) {
  return createElement('Progress', props);
};

exports.Spinner = function Spinner(props) {
  return createElement('Spinner', props);
};

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

exports.Button = function Button(props) {
  return createElement('Button', props);
};

exports.Link = function Link(props) {
  return createElement('Link', props);
};

exports.ActionMenu = function ActionMenu(props) {
  return createElement('ActionMenu', props);
};

// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

exports.TextField = function TextField(props) {
  return createElement('TextField', props);
};

exports.TextArea = function TextArea(props) {
  return createElement('TextArea', props);
};

exports.Select = function Select(props) {
  return createElement('Select', props);
};

exports.Checkbox = function Checkbox(props) {
  return createElement('Checkbox', props);
};

exports.Toggle = function Toggle(props) {
  return createElement('Toggle', props);
};

exports.DatePicker = function DatePicker(props) {
  return createElement('DatePicker', props);
};

exports.RadioGroup = function RadioGroup(props) {
  return createElement('RadioGroup', props);
};

// ---------------------------------------------------------------------------
// Compound
// ---------------------------------------------------------------------------

exports.Tabs = function Tabs(props) {
  return createElement('Tabs', props);
};

exports.Accordion = function Accordion(props) {
  return createElement('Accordion', props);
};

// ---------------------------------------------------------------------------
// Extended Layout
// ---------------------------------------------------------------------------

exports.Separator = function Separator(props) {
  return createElement('Separator', props);
};

exports.Box = function Box(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Box', props, children);
};

exports.InlineStack = function InlineStack(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('InlineStack', props, children);
};

exports.BlockStack = function BlockStack(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('BlockStack', props, children);
};

exports.InlineGrid = function InlineGrid(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('InlineGrid', props, children);
};

exports.Bleed = function Bleed(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Bleed', props, children);
};

// ---------------------------------------------------------------------------
// Extended Display
// ---------------------------------------------------------------------------

exports.Thumbnail = function Thumbnail(props) {
  return createElement('Thumbnail', props);
};

exports.Banner = function Banner(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Banner', props, children);
};

exports.CalloutCard = function CalloutCard(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('CalloutCard', props, children);
};

exports.EmptyState = function EmptyState(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('EmptyState', props, children);
};

exports.Tag = function Tag(props) {
  return createElement('Tag', props);
};

exports.SkeletonBodyText = function SkeletonBodyText(props) {
  return createElement('SkeletonBodyText', props);
};

exports.DescriptionList = function DescriptionList(props) {
  return createElement('DescriptionList', props);
};

exports.MediaCard = function MediaCard(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('MediaCard', props, children);
};

exports.FooterHelp = function FooterHelp(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('FooterHelp', props, children);
};

// ---------------------------------------------------------------------------
// Extended Actions
// ---------------------------------------------------------------------------

exports.PageActions = function PageActions(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('PageActions', props, children);
};

// ---------------------------------------------------------------------------
// Resource
// ---------------------------------------------------------------------------

exports.ResourceList = function ResourceList(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('ResourceList', props, children);
};

exports.ResourceItem = function ResourceItem(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('ResourceItem', props, children);
};

// ---------------------------------------------------------------------------
// Polaris-equivalent: Layout
// ---------------------------------------------------------------------------

exports.Layout = function Layout(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Layout', props, children);
};

exports.LayoutSection = function LayoutSection(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('LayoutSection', props, children);
};

exports.Page = function Page(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Page', props, children);
};

exports.ButtonGroup = function ButtonGroup(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('ButtonGroup', props, children);
};

exports.Collapsible = function Collapsible(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Collapsible', props, children);
};

// ---------------------------------------------------------------------------
// Polaris-equivalent: Display
// ---------------------------------------------------------------------------

exports.Avatar = function Avatar(props) {
  return createElement('Avatar', props);
};

exports.SkeletonPage = function SkeletonPage(props) {
  return createElement('SkeletonPage', props);
};

exports.SkeletonDisplayText = function SkeletonDisplayText(props) {
  return createElement('SkeletonDisplayText', props);
};

exports.SkeletonThumbnail = function SkeletonThumbnail(props) {
  return createElement('SkeletonThumbnail', props);
};

exports.VideoThumbnail = function VideoThumbnail(props) {
  return createElement('VideoThumbnail', props);
};

exports.ExceptionList = function ExceptionList(props) {
  return createElement('ExceptionList', props);
};

// ---------------------------------------------------------------------------
// Polaris-equivalent: Data / Filter
// ---------------------------------------------------------------------------

exports.IndexTable = function IndexTable(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('IndexTable', props, children);
};

exports.DataTable = function DataTable(props) {
  return createElement('DataTable', props);
};

exports.Filters = function Filters(props) {
  return createElement('Filters', props);
};

exports.Pagination = function Pagination(props) {
  return createElement('Pagination', props);
};

// ---------------------------------------------------------------------------
// Polaris-equivalent: Input
// ---------------------------------------------------------------------------

exports.Autocomplete = function Autocomplete(props) {
  return createElement('Autocomplete', props);
};

exports.ColorPicker = function ColorPicker(props) {
  return createElement('ColorPicker', props);
};

exports.DropZone = function DropZone(props) {
  return createElement('DropZone', props);
};

exports.RangeSlider = function RangeSlider(props) {
  return createElement('RangeSlider', props);
};

// ---------------------------------------------------------------------------
// Polaris-equivalent: Overlay / Container
// ---------------------------------------------------------------------------

exports.Popover = function Popover(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Popover', props, children);
};

exports.Tooltip = function Tooltip(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Tooltip', props, children);
};

exports.Sheet = function Sheet(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Sheet', props, children);
};

exports.Scrollable = function Scrollable(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Scrollable', props, children);
};

exports.OptionList = function OptionList(props) {
  return createElement('OptionList', props);
};

// ---------------------------------------------------------------------------
// Polaris-equivalent: Feedback
// ---------------------------------------------------------------------------

exports.Truncate = function Truncate(props) {
  return createElement('Truncate', props);
};

exports.TextStyle = function TextStyle(props) {
  return createElement('TextStyle', props);
};

// ---------------------------------------------------------------------------
// Polaris-equivalent: Navigation
// ---------------------------------------------------------------------------

exports.Listbox = function Listbox(props) {
  return createElement('Listbox', props);
};

// ---------------------------------------------------------------------------
// Overlay — Modal & Drawer
// ---------------------------------------------------------------------------

exports.Modal = function Modal(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Modal', props, children);
};

exports.Drawer = function Drawer(props) {
  var children = Array.prototype.slice.call(arguments, 1);
  return createElement('Drawer', props, children);
};
