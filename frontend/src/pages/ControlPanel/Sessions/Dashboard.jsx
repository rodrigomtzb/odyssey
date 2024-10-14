import { Card } from "react-bootstrap"
import { MainCard, Title } from "../../../components"
import { CardButton } from "../../../components/Buttons"

const DashboardSessions = () => {
    return (
        <MainCard>
            <Card>
                <Title title="Sesiones" />
                <CardButton icon="ui-checks" section="Sesiones" text="Lista de Sesiones" to="list" />
            </Card>
        </MainCard>
    )
}

export default DashboardSessions