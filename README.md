# NumDisplay Package

A flexible React component for displaying numbers with smart formatting, tooltips, and type-specific styling.

## Features

- **Smart Number Formatting**: Automatically formats numbers based on their magnitude
- **Multiple Types**: Support for dollar amounts, percentages, and token values
- **Very Small Number Handling**: Special formatting for very small decimal numbers with subscript notation
- **Tooltips**: Built-in tooltip support to show full precision values
- **Customizable**: Flexible styling with className support
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Accessible**: Built with accessibility in mind using Radix UI primitives

## Installation

```bash
npm install numdisplay
```

## Repository

[GitHub Repository](https://github.com/abdulhaseeb13mar/NumDisplay)

## Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-dom
```

## Basic Usage

```tsx
import { NumDisplay, TooltipProvider } from "numdisplay";

function App() {
  return (
    <TooltipProvider>
      <NumDisplay value="1234.56" type="dollar" />
      <NumDisplay value="15.75" type="percentage" />
      <NumDisplay value="0.00001234" type="token" />
    </TooltipProvider>
  );
}
```

## API Reference

### NumDisplay Props

| Prop              | Type                                  | Description                               | Default     |
| ----------------- | ------------------------------------- | ----------------------------------------- | ----------- |
| `value`           | `string`                              | The numeric value to display              | -           |
| `type`            | `"dollar" \| "percentage" \| "token"` | The type of number being displayed        | -           |
| `decimals`        | `number`                              | Fixed number of decimal places (optional) | `undefined` |
| `className`       | `string`                              | CSS class for styling                     | -           |
| `disableTooltip`  | `boolean`                             | Disable the tooltip                       | `false`     |
| `showPlusSign`    | `boolean`                             | Show plus sign for positive numbers       | `false`     |
| `prefix`          | `string \| ReactNode`                 | Content to display before the number      | -           |
| `suffix`          | `string \| ReactNode`                 | Content to display after the number       | -           |
| `prefixClassName` | `string`                              | CSS class for prefix styling              | -           |
| `suffixClassName` | `string`                              | CSS class for suffix styling              | -           |
| `tooltipValue`    | `string`                              | Custom tooltip value                      | -           |

### CoreNumDisplay Props

Same as NumDisplay but without `prefix`, `suffix`, `prefixClassName`, and `suffixClassName`.

## Examples

### Basic Currency Display

```tsx
<NumDisplay value="1234.56" type="dollar" />
// Displays: $1,234.56
```

### Percentage with Custom Decimals

```tsx
<NumDisplay value="15.756" type="percentage" decimals={1} />
// Displays: 15.7%
```

### Very Small Numbers

```tsx
<NumDisplay value="0.00001234" type="token" />
// Displays: 0.12₄ (with subscript showing omitted zeros)
```

### With Prefix and Suffix

```tsx
<NumDisplay
  value="100"
  type="token"
  prefix="Balance:"
  suffix="ETH"
  showPlusSign={true}
/>
// Displays: Balance: +100 ETH
```

### Custom Styling

```tsx
<NumDisplay
  value="1000"
  type="dollar"
  className="text-lg font-bold text-green-600"
  prefixClassName="text-gray-500"
  prefix="Total:"
/>
```

## Smart Formatting Rules

The component automatically applies different decimal precision based on the number's magnitude:

### Dollar Type

- `>= 100`: 0 decimals
- `>= 10`: 1 decimal
- `>= 1`: 2 decimals
- `>= 0.1`: 3 decimals
- `>= 0.01`: 4 decimals
- `< 0.01`: Special very small number formatting

### Token Type

- `>= 100`: 0 decimals
- `>= 10`: 1 decimal
- `>= 0.01`: 2 decimals
- `< 0.01`: Special very small number formatting

### Percentage Type

- `>= 100`: 0 decimals
- `>= 10`: 1 decimal
- `< 10`: 2 decimals

## Very Small Number Handling

For very small numbers (< 0.01), the component uses a special notation:

```tsx
<NumDisplay value="0.000001234" type="dollar" />
// Displays: $0.12₄
// Where ₄ indicates 4 omitted zeros after the decimal point
```

## Tooltip Behavior

- Tooltips are automatically enabled and show the full precision value
- Tooltips are automatically disabled for zero values
- Can be manually disabled with `disableTooltip={true}`
- Custom tooltip values can be provided with `tooltipValue`

## TypeScript Support

The package includes comprehensive TypeScript definitions:

```tsx
import { NumDisplayProps, CoreNumDisplayProps } from "numdisplay";

const MyComponent: React.FC<{ config: NumDisplayProps }> = ({ config }) => {
  return <NumDisplay {...config} />;
};
```

## Styling

The component uses Tailwind CSS classes and can be styled with:

- `className` for the main number display
- `prefixClassName` and `suffixClassName` for prefix/suffix styling
- The component is designed to work well with Tailwind CSS but doesn't require it

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
