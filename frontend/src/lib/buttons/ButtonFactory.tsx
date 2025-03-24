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
            styles = `${!disabled ? 'bg-pink-500 hover:bg-pink-700' : 'bg-pink-200'} text-white px-4 py-2 rounded `
            break
        case ButtonType.SECONDARY:
            styles = 'px-4 py-2 text-pink-500 font-semibold hover:bg-pink-50 rounded-md'

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

Button.Primary = ButtonPrimary
Button.Secondary = ButtonSecondary
Button.Danger = ButtonDanger
