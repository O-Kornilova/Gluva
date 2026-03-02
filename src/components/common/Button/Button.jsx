import PropTypes from 'prop-types'

const Button = ({ title, id, rightIcon, leftIcon, containerClass, onClick, disabled }) => {
  return (
    <button
      id={id}
      onClick={onClick}
      disabled={disabled}
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${containerClass}`}
    >
      {leftIcon}

      <span className='relative inline-flex overflow-hidden font-general text-xs uppercase'>
        <div>{title}</div>
      </span>

      {rightIcon}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  containerClass: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

export default Button
