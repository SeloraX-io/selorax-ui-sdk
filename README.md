# @selorax/ui

The official SeloraX Extension UI SDK for building extensions on the SeloraX platform. Provides 64 UI component builders and the `selorax` app bridge for communicating with the host dashboard.

## Installation

```bash
npm install @selorax/ui
```

## Quick Start

### JSON Mode (Declarative UI)

```javascript
import { Card, Text, Button, Stack } from '@selorax/ui';

const ui = Card({},
  Stack({ direction: 'vertical', gap: 'md' },
    Text({ variant: 'headingMd' }, 'Hello World'),
    Button({
      label: 'Click Me',
      action: { type: 'set_state', key: 'clicked', value: true }
    })
  )
);
```

### Sandbox Mode (App Bridge)

```javascript
import { selorax } from '@selorax/ui';

// Signal readiness
selorax.ready();

// Show a toast notification
selorax.toast('Order updated!', 'success');

// Navigate within dashboard
selorax.navigate('/orders');

// Make authenticated API requests
const orders = await selorax.api.get('/orders?limit=10');

// Open a resource picker
const products = await selorax.picker.product({ multiple: true });

// Set up title bar
selorax.ui.titleBar({
  title: 'My Extension',
  primaryAction: { label: 'Save', action_type: 'save' }
});

// Show contextual save bar
selorax.ui.showSaveBar({
  saveAction: { label: 'Save' },
  discardAction: { label: 'Discard' }
});

// Manage metafields
await selorax.metafields.set('my-namespace', 'key', {
  value: 'hello',
  type: 'single_line_text'
});
```

## Components (64 total)

### Layout
`Card` `Stack` `Grid` `Divider` `Separator` `Box` `InlineStack` `BlockStack` `InlineGrid` `Bleed` `Layout` `LayoutSection` `Page` `ButtonGroup` `Collapsible`

### Display
`Text` `Heading` `Image` `Badge` `Icon` `KeyValue` `List` `Table` `Thumbnail` `Banner` `CalloutCard` `EmptyState` `Tag` `SkeletonBodyText` `DescriptionList` `MediaCard` `FooterHelp` `Avatar` `SkeletonPage` `SkeletonDisplayText` `SkeletonThumbnail` `VideoThumbnail` `ExceptionList` `Truncate` `TextStyle`

### Input
`TextField` `TextArea` `Select` `Checkbox` `Toggle` `DatePicker` `RadioGroup` `Autocomplete` `ColorPicker` `DropZone` `RangeSlider`

### Actions
`Button` `Link` `ActionMenu` `PageActions`

### Data & Filters
`IndexTable` `DataTable` `Filters` `Pagination` `ResourceList` `ResourceItem`

### Overlay
`Modal` `Drawer` `Popover` `Tooltip` `Sheet` `Scrollable` `OptionList` `Listbox`

### Feedback
`Alert` `Progress` `Spinner`

### Navigation
`Tabs` `Accordion`

## Action Types

Actions define what happens when a user interacts with a component:

```javascript
// Navigate within dashboard
{ type: 'navigate', url: '/orders/123' }

// Open external link
{ type: 'open_link', url: 'https://example.com', external: true }

// Update component state
{ type: 'set_state', key: 'active', value: true }

// Call your app's backend
{ type: 'call_backend', url: '/api/process', method: 'POST', body: { id: 1 } }

// Open/close modal or drawer
{ type: 'open_modal', id: 'confirm-dialog' }
{ type: 'close_modal' }
{ type: 'open_drawer', id: 'detail-panel' }
{ type: 'close_drawer' }

// Call SeloraX API
{ type: 'selorax_api', url: '/orders', method: 'GET' }
```

## App Bridge (`selorax`)

| Method | Description |
|--------|-------------|
| `selorax.ready()` | Signal extension is ready |
| `selorax.toast(message, type)` | Show toast (`'success'`, `'error'`, `'warning'`) |
| `selorax.navigate(url)` | Navigate within dashboard |
| `selorax.openLink(url)` | Open external URL |
| `selorax.close()` | Close extension modal |
| `selorax.dispatchAction(type, payload)` | Dispatch a generic action |
| `selorax.api.get(url)` | GET request via API proxy |
| `selorax.api.post(url, body)` | POST request via API proxy |
| `selorax.api.put(url, body)` | PUT request via API proxy |
| `selorax.api.patch(url, body)` | PATCH request via API proxy |
| `selorax.api.del(url)` | DELETE request via API proxy |
| `selorax.picker.product(opts)` | Open product picker |
| `selorax.picker.customer(opts)` | Open customer picker |
| `selorax.picker.order(opts)` | Open order picker |
| `selorax.modal.open(content)` | Open modal with UI tree |
| `selorax.modal.close()` | Close modal |
| `selorax.ui.titleBar(config)` | Set title bar |
| `selorax.ui.showSaveBar(config)` | Show contextual save bar |
| `selorax.ui.hideSaveBar()` | Hide save bar |
| `selorax.ui.startLoading()` | Show loading bar |
| `selorax.ui.completeLoading()` | Complete loading bar |
| `selorax.metafields.get(ns, key)` | Get metafield value |
| `selorax.metafields.set(ns, key, val)` | Set metafield value |
| `selorax.metafields.del(ns, key)` | Delete metafield |
| `selorax.metafields.list(opts)` | List metafields |

## TypeScript

Full TypeScript support included. Import types directly:

```typescript
import { Card, Text, Button, selorax } from '@selorax/ui';
import type { Action, UINode, Selorax, CardProps, ButtonProps } from '@selorax/ui';
```

## License

MIT - SeloraX
