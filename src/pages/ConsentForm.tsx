import axios from "axios";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { useLocation } from "react-router";

const ConsentForm: FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();

  const sendFormData = async () => {
    const queryParams = new URLSearchParams(location.search);
    const stateValue = queryParams.get("state");
    const auth0Domain = queryParams.get("auth0_domain");
    if (!stateValue || !auth0Domain) return;

    const authURL = `https://${auth0Domain}/continue?state=${stateValue}`;
    try {
      await axios.post(
        authURL,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: { newsletter: isChecked }, // example usage
        }
      );
    } catch (error) {
      //console.log(error);
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log("Checkbox state:", isChecked);
    sendFormData();
  };

  return (
    <div>
      {/* ... */}
      <div className="container">
        <div className="jumbotron">
          <p>I agree to marketing emails</p>

          <form method="post" onSubmit={handleSubmit}>
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  name="newsletter"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />{" "}
                I agree
              </label>
            </div>
            <input
              type="submit"
              className="btn btn-lg btn-success"
              value="Submit"
            />
          </form>
        </div>
      </div>
      {/* ... */}
    </div>
  );
};

export default ConsentForm;
