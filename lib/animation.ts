export const getAnimationClasses = (isVisible: boolean) => {
    return {
        overlay: `fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${isVisible ? 'animate-fade-in' : 'animate-fade-out'}`,
        content: `relative bg-white rounded-lg shadow dark:bg-gray-700 transition-transform duration-300 ease-in-out transform ${isVisible ? 'scale-95 animate-slide-in' : 'scale-90 animate-slide-out'}`,
    };
};