'use client';

import { forwardRef, useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from 'utils/shadcn';
import { useForwardedRef } from 'utils/use-forwarded-ref';
import type { ButtonProps } from 'app/components/ui/button';
import { Button } from 'app/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'app/components/ui/popover';
import { Input } from 'app/components/ui/input';
import { Paintbrush } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef,
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value || '#FFFFFF';
    }, [value]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button variant="outline" className="mx-2 p-5">
            <Paintbrush className="w-4 h-4 mr-2" />
            Customize Colour
          </Button>
          {/* <Button
                        {...props}
                        className={cn('block', className)}
                        name={name}
                        onClick={() => {
                            setOpen(true);
                        }}
                        size="icon"
                        style={{
                            backgroundColor: parsedValue,
                        }}
                        variant="outline"
                    >
                        <div />
                    </Button> */}
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <HexColorPicker color={parsedValue} onChange={onChange} />
          <Input
            maxLength={7}
            onChange={e => {
              onChange(e?.currentTarget?.value);
            }}
            ref={ref}
            value={parsedValue}
          />
        </PopoverContent>
      </Popover>
    );
  },
);
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
