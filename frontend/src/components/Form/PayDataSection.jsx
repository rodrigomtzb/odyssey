import { useEffect, useState } from "react";
import Input from "./Input";
import TitleSection from "./TitleSection";
import { handleFormChange, scrollToTop } from "../../utils";
import Select from "./Select";
import BankService from "../../services/bank.service";
import CatalogsService from "../../services/catalogs.service";
import SelectButton from "./SelectButton";
import { Button } from "react-bootstrap";
import SupplierService from "../../services/supplier.service";

const PayDataSection = ({ id, type, formData, setFormData, state }) => {
  const [isOpen, setIsOpen] = useState(state || true);
  const [selectedBank, setSelectedBank] = useState();
  const [cardType, setCardType] = useState("");
  const [accountTypes, setAccountTypes] = useState();
  const [banks, setBanks] = useState();
  const [payData, setPayData] = useState({
    bankId: "",
    account: "",
    accountTypeId: 1,
  });
  const isTypeClabe = payData.accountTypeId === 3;

  const handleChange = (e) => {
    const value = e.target.value.trim();
    const name = e.target.name;

    setPayData({
      ...payData,
      [name]: value,
    });

    if (/^4/.test(value)) {
      setCardType("visa");
    } else if (/^5[1-5]/.test(value)) {
      setCardType("mastercard");
    } else {
      setCardType("");
    }
  };

  const handleSubmit = () => {
    if (isTypeClabe) {
      setPayData({
        ...payData,
        bankId: selectedBank,
      });
    }
    if (formData) {
      switch (type) {
        case "supplier":
          SupplierService.editSupplierAccount(id, payData).then((response) => {
            setFormData(response.data);
            scrollToTop();
            setIsOpen(false);
          });
          break;
      }
    } else {
      switch (type) {
        case "supplier":
          SupplierService.addAccount(id, payData)
            .then((response) => {
              setFormData(response.data);
              scrollToTop();
              setIsOpen(false);
            })
            .catch((err) => console.error(err));
          break;
      }
    }
  };

  useEffect(() => {
    if (formData) {
      setIsOpen(true);
      setPayData({
        ...formData,
        accountTypeId: formData.accountType.id,
        bankId: formData.bank.id,
      });
      setSelectedBank(formData.bank.id);
    }
  }, [formData]);
  useEffect(() => {
    setIsOpen(state);
  }, [state]);

  useEffect(() => {
    if (isTypeClabe) {
      if (payData.account.length == 3) {
        BankService.getBankByFirstNumbers(payData.account).then((response) => {
          if (response.data.length === 1) {
            setSelectedBank(response.data[0].id);
          }
        });
      } else if (payData.account.length < 3 && payData.bankId) {
        setSelectedBank("");
      }
    }
  }, [payData.account, payData.accountTypeId]);

  useEffect(() => {
    BankService.getBanks().then((response) => {
      setBanks(response.data);
    });
    CatalogsService.getAccountType().then((response) => {
      setAccountTypes(response.data);
    });
  }, []);
  return (
    <>
      <div id="accountSection">
        <TitleSection text="Datos Bancarios" state={isOpen}>
          <SelectButton
            label="Tipo de Cuenta"
            name="accountTypeId"
            options={accountTypes}
            optionLabel="name"
            optionValue="id"
            value={payData.accountTypeId}
            onChange={handleFormChange(payData, setPayData)}
          />
          <div className="position-relative mb-3">
            <Input
              label={isTypeClabe ? "CLABE" : "Numero de tarjeta"}
              type="text"
              className="form-input"
              name="account"
              placeholder={
                isTypeClabe
                  ? "Ingresa tu número de CLABE"
                  : "Ingresa tu número de tarjeta"
              }
              value={payData.account}
              onChange={handleChange}
              style={
                !isTypeClabe
                  ? {
                      paddingLeft: "50px",
                    }
                  : ""
              }
              regexType="only-numbers"
              mask={isTypeClabe ? "999 999 999999 9" : "9999 9999 9999 999?9"}
            />
            {!isTypeClabe && cardType && (
              <img
                src={
                  cardType === "visa"
                    ? "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    : "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                }
                alt={cardType}
                className="position-absolute"
                style={{
                  left: "10px",
                  top: "50%",
                  width: "30px",
                  height: "30px",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
          <Select
            label="Banco"
            options={banks}
            name="bankId"
            value={isTypeClabe ? selectedBank : payData.bankId}
            onChange={handleFormChange(payData, setPayData)}
            disabled={isTypeClabe}
          />
          <Button variant="gd" onClick={handleSubmit}>
            {formData ? "Actualizar" : "Añadir"}
          </Button>
        </TitleSection>
      </div>
    </>
  );
};

export default PayDataSection;
