import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CancelButton = ({className}) => {
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate(-1);
    }

    return <Button onClick={handleCancel} variant="danger" className={className}>Cancelar</Button>
}

export default CancelButton;