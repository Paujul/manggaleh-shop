function getButtonStyle(isIdleState: boolean, clampedProgress: number) {
  return isIdleState
    ? {
        backgroundColor: '#434343',
        color: '#ffffff',
        border: '1px solid #434343',
      }
    : {
        backgroundColor: '#ffffff',
        color: clampedProgress >= 50 ? '#ffffff' : '#434343',
        border: '1px solid #434343',
        backgroundImage: `linear-gradient(to right, #434343, #434343)`,
        backgroundSize: `${clampedProgress}% 100%`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
        transition: 'background-size 0.2s ease',
      }
}

export default getButtonStyle
