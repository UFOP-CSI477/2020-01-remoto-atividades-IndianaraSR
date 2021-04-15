import { CardActions, CardContent, Button } from '@material-ui/core';
import { deletarFormulario } from 'api/routes';
import { store } from 'react-notifications-component';

import { Card, Informacoes } from './styles';

export default function Item({ atualizaLista, data }) {
    function pad(d) {
        if(d < 10) {
            return '0' + d.toString();
        } else {
            return d.toString();
        }
    }

    function formataData(d) {
        const data = new Date(d);

        return pad(data.getDate()) + "/" + pad(data.getMonth()+1) + "/" + pad(data.getFullYear());
    }

    function InformacaoComDado({ label, dado }) {
        return (
            <div>
                <strong>{label} </strong>
                <span>{dado}</span>
            </div>
        );
    }

    async function handleApagar() {
        try {
            await deletarFormulario(data._id);

            store.addNotification({
                title: "Form apagado",
                message: "O formulário foi apagado com sucesso",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__flipIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });

            atualizaLista();
        } catch(error) {
            store.addNotification({
                title: "Falha ao apagar",
                message: "Não foi possível apagar o formulário",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__flipIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
        }
    }

    return(
        <Card >
            <CardContent>
                <span>id: {data._id}</span>

                <Informacoes>
                    <strong className="titulo">Sintomas Pós Covid</strong>

                    <InformacaoComDado label="Fadiga?" dado={data.sindrome.fadiga ? "Sim" : "Não"} />
                    <InformacaoComDado label="Falta de ar?" dado={data.sindrome.falta_ar ? "Sim" : "Não"} />
                    <InformacaoComDado label="Queda de cabelo?" dado={data.sindrome.queda_cabelo ? "Sim" : "Não"} />
                    <InformacaoComDado label="Dor muscular?" dado={data.sindrome.dor_muscular ? "Sim" : "Não"} />
                    <InformacaoComDado label="Perda de paladar?" dado={data.sindrome.perda_paladar ? "Sim" : "Não"} />
                    <InformacaoComDado label="Tontura?" dado={data.sindrome.tontura ? "Sim" : "Não"} />
                    <InformacaoComDado label="Dor no peito?" dado={data.sindrome.dor_peito ? "Sim" : "Não"} />
                    <InformacaoComDado label="Trombose?" dado={data.sindrome.trombose ? "Sim" : "Não"} />
                    <InformacaoComDado label="Dificuldade de linguagem?" dado={data.sindrome.dificuldade_linguagem ? "Sim" : "Não"} />
                    <InformacaoComDado label="Dificuldade de raciocínio?" dado={data.sindrome.dificuldade_raciocinio ? "Sim" : "Não"} />
                    <InformacaoComDado label="Alteração na menstruação?" dado={data.sindrome.alteracao_menstruacao ? "Sim" : "Não"} />   
                </Informacoes>

                <span>Respondido em: {formataData(data.createdAt)}</span><br />
            </CardContent>

            <CardActions>
                <Button size="small" onClick={handleApagar}>Apagar</Button>
            </CardActions>
        </Card>
    );

    return (
        <Card >
            <CardContent>
                <span>id: {data._id}</span>

                <Informacoes>
                    <strong className="titulo">Padrão Comportamental</strong>

                    <InformacaoComDado label="Sexo:" dado={data.padraoComportamental.sexo} />
                    <InformacaoComDado label="Nascimento:" dado={formataData(data.padraoComportamental.nascimento)} />
                    <InformacaoComDado label="Suscetivel:" dado={data.padraoComportamental.suscetivel} />
                    <InformacaoComDado label="Necessidade médica:" dado={data.padraoComportamental.necessidade_medica} />
                    <InformacaoComDado label="Contato diário (pessoas):" dado={data.padraoComportamental.contato_diario} />
                    <InformacaoComDado label="Número de vezes que saí na semana:" dado={data.padraoComportamental.sair_semana} />
                    <InformacaoComDado label="Número de visitas a lugares de risco:" dado={data.padraoComportamental.visita_lugar_risco} />
                    <InformacaoComDado label="Sai casualmente?" dado={data.padraoComportamental.sair_casualmente ? "Sim" : "Não"} />
                </Informacoes>

                <Informacoes>
                    <strong className="titulo">Grupo de risco</strong>

                    <InformacaoComDado label="Está acima do peso?" dado={data.grupoRisco.acima_peso ? "Sim" : "Não"} />
                    <InformacaoComDado label="Tem doença cardíaca?" dado={data.grupoRisco.doencas_cardiaca ? "Sim" : "Não"} />
                    <InformacaoComDado label="Tem doenças pulmonares?" dado={data.grupoRisco.doencas_pulmonar ? "Sim" : "Não"} />
                    <InformacaoComDado label="Baixa imunidade?" dado={data.grupoRisco.baixa_imunidade ? "Sim" : "Não"} />
                    <InformacaoComDado label="Doenças renais?" dado={data.grupoRisco.doencas_renais ? "Sim" : "Não"} />
                    <InformacaoComDado label="Diabético?" dado={data.grupoRisco.diabetico ? "Sim" : "Não"} />
                    <InformacaoComDado label="Gestante?" dado={data.grupoRisco.gestantes ? "Sim" : "Não"} />
                    <InformacaoComDado label="Doenças fígado?" dado={data.grupoRisco.doencas_figado ? "Sim" : "Não"} />
                    <InformacaoComDado label="Grupo de risco?" dado={data.grupoRisco.grupo_risco ? "Sim" : "Não"} />
                </Informacoes>

                <Informacoes>
                    <strong className="titulo">Sintomas</strong>

                    <Informacoes>
                        <strong className="titulo">Moderado</strong>

                        <InformacaoComDado label="Tosse persistente?" dado={data.sintomas.moderado.tosse_persistente ? "Sim" : "Não"} />
                        <InformacaoComDado label="Febre persistente?" dado={data.sintomas.moderado.febre_persistente ? "Sim" : "Não"} />
                        <InformacaoComDado label="Diarreia?" dado={data.sintomas.moderado.diarreia ? "Sim" : "Não"} />
                        <InformacaoComDado label="Cansaço?" dado={data.sintomas.moderado.cansaco ? "Sim" : "Não"} />
                        <InformacaoComDado label="Dor de cabeça?" dado={data.sintomas.moderado.dor_de_cabeca ? "Sim" : "Não"} />
                        <InformacaoComDado label="Perda de paladar?" dado={data.sintomas.moderado.perda_paladar ? "Sim" : "Não"} />
                        <InformacaoComDado label="Perda de olfato?" dado={data.sintomas.moderado.perda_olfato ? "Sim" : "Não"} />
                    </Informacoes>    

                    <Informacoes>
                        <strong className="titulo">Grave</strong>

                        <InformacaoComDado label="Falta de ar?" dado={data.sintomas.grave.falta_ar ? "Sim" : "Não"} />
                        <InformacaoComDado label="Dor no peito?" dado={data.sintomas.grave.dor_peito ? "Sim" : "Não"} />
                        <InformacaoComDado label="Pressão no peito?" dado={data.sintomas.grave.pressao_peito ? "Sim" : "Não"} />
                        <InformacaoComDado label="Perda de fala?" dado={data.sintomas.grave.perda_fala ? "Sim" : "Não"} />
                        <InformacaoComDado label="Perda de movimento?" dado={data.sintomas.grave.perda_movimento ? "Sim" : "Não"} />
                        <InformacaoComDado label="Dificuldade alimentar?" dado={data.sintomas.grave.dificuldade_alimentar ? "Sim" : "Não"} />
                    </Informacoes>                
                </Informacoes>

                <span>Respondido em: {formataData(data.createdAt)}</span><br />
            </CardContent>

            <CardActions>
                <Button size="small" onClick={handleApagar}>Apagar</Button>
            </CardActions>
        </Card>
    );
}