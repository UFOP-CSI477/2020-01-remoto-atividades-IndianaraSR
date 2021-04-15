import Lottie from 'react-lottie';
import animationData from './26428-covid-19-protect.json';

export default function LottieControl({ height, width }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <Lottie
            options={defaultOptions}
            height={height}
            width={width}
            isClickToPauseDisabled={true} />
    );
}