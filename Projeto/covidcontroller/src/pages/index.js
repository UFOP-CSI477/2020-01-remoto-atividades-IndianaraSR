import AppBar from 'components/AppBar';
import AnimacaoCovid from 'components/AnimacaoCovid';

export default function Home (){    
    return (
        <div>
            <AppBar />
            
            <AnimacaoCovid height={500} width={700} />
        </div>
    );
}