import { ReactNode } from 'react'
import { ButtonType } from './types/Button'

export interface ButtonProps {
    /** Message to show in the body of the button. */
    children: ReactNode
    /**
     * On Click handler
     */
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
    disabled?: boolean
    submitType?: boolean
}

export interface ButtonTypeProps {
    /** Type of the button: primary or danger */
    type: ButtonType
}

type ButtonFullProps = ButtonProps & ButtonTypeProps

export default function Button({
    children,
    type,
    disabled = false,
    submitType = false,
    onClick,
}: ButtonFullProps) {
    let styles
    switch (type) {
        case ButtonType.PRIMARY:
            if (disabled) {
                styles =
                    'bg-green-100  text-white shadow-[0_0_0_0_#21ad67] px-6 py-4 border-0 rounded-full text-base font-semibold'
            } else {
                styles =
                    'bg-[#21ad67] text-white shadow-[0_0_0_0_#21ad67] px-6 py-4 border-0 rounded-full text-base font-semibold transition-all duration-500 ease-in-out hover:shadow-[0_4px_20px_0_#21ad67] hover:translate-y-[3px] hover:duration-100'
            }
            break
        case ButtonType.SECONDARY:
            styles =
                'px-4 py-2 text-white tracking-wider font-semibold hover:bg-yellow-200 rounded-md'

            break
        case ButtonType.INVERTED:
            styles =
                'px-4 py-2 text-gray-500 tracking-wider font-semibold hover:bg-gray-200 rounded-md'

            break
        case ButtonType.DANGER:
            styles = 'bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded'
            break
        default:
            styles = 'bg-pink-500 text-white hover:bg-pink-700 px-4 py-2 rounded'
    }
    return (
        <button
            onClick={onClick}
            className={styles}
            disabled={disabled}
            type={submitType ? 'submit' : 'button'}>
            {children}
        </button>
    )
}

const ButtonPrimary = (props: ButtonProps) => <Button {...props} type={ButtonType.PRIMARY} />
const ButtonDanger = (props: ButtonProps) => <Button {...props} type={ButtonType.DANGER} />
const ButtonSecondary = (props: ButtonProps) => <Button {...props} type={ButtonType.SECONDARY} />
const ButtonInverted = (props: ButtonProps) => <Button {...props} type={ButtonType.INVERTED} />

Button.Primary = ButtonPrimary
Button.Secondary = ButtonSecondary
Button.Danger = ButtonDanger
Button.Inverted = ButtonInverted
