import React, { useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as EyeHideIcon } from "../../assets/icons/eye-hide.svg";
import { ReactComponent as EyeShowIcon } from "../../assets/icons/eye-show.svg";
import { ReactComponent as WrongIcon } from "../../assets/icons/wrong-icon.svg";
import { ReactComponent as CorrectIcon } from "../../assets/icons/correct-icon.svg";
import { ReactComponent as WarningIcon } from "../../assets/icons/warning-icon.svg";
import "./FormInput.scss";
import { formatTimer } from "../../utils/time";

const checkPassword = (password) => ({
  minLength: password.length >= 8,
  isComplex:
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_\-+={}[\]:";'<>?,./\\|])/.test(
      password
    ),
});

const FormInput = ({
  label,
  type = "text",
  id,
  name,
  value,
  onChange,
  maxLength,
  required,
  showErrorMsg = true,
  errorMsg,
  showValidation,
  showPasswordIcons = false,
  showPasswordCondition = false,
  showSendOtpButton = false,
  handleSendCode,
  otpTimer = 0,
  infoNote,
  disabled = false,
  readOnly = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checkValidation, setCheckValidation] = useState(false);
  const showError = Boolean(errorMsg) && (checkValidation || showValidation);

  const PasswordStatusItem = ({ isValid, text }) => (
    <li className={isValid ? "valid" : showError ? "invalid" : ""}>
      {isValid ? (
        <CorrectIcon className="password-status-icon" />
      ) : (
        <WrongIcon className="password-status-icon" />
      )}
      {text}
    </li>
  );

  return (
    <div
      className={`floating-input ${showError ? "error" : ""} ${
        isFocused ? "focused" : ""
      } `}
    >
      <div className="input-wrap">
        <input
          id={id}
          type={showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete="off"
          className={value ? "has-value" : ""}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            setCheckValidation(true);
          }}
          maxLength={maxLength}
          onKeyDown={(e) => {
            const isModifierKey = e.ctrlKey || e.metaKey || e.altKey;

            if (
              type === "digit" &&
              !/^\d$/.test(e.key) &&
              !(
                (e.ctrlKey || e.metaKey || e.altKey) &&
                /^[a-zA-Z]$/.test(e.key)
              ) &&
              ![
                "Backspace",
                "Delete",
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                "Tab",
              ].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            if (type === "digit") {
              const pasted = e.clipboardData.getData("text");
              if (!/^\d+$/.test(pasted)) {
                e.preventDefault();
              }
            }
          }}
          disabled={disabled}
          readOnly={readOnly}
        />
        <label htmlFor={id}>{label}</label>

        {showPasswordIcons &&
          (showPassword ? (
            <EyeShowIcon
              className="pass-icons"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeHideIcon
              className="pass-icons"
              onClick={() => setShowPassword(true)}
            />
          ))}
      </div>

      <div className="input-bottom-area">
        {/* Error message */}
        {showError && showErrorMsg && (
          <p className="error-msg">
            <WarningIcon className="error-icon" /> {errorMsg}
          </p>
        )}

        {!showError && infoNote && <p className="info-note">{infoNote}</p>}

        {/* Password requirements */}
        {type === "password" && showPasswordCondition && (
          <div className="password-requirements">
            {(() => {
              const passwordChecks = checkPassword(value);
              return (
                <ul>
                  <PasswordStatusItem
                    isValid={passwordChecks.minLength}
                    text="Minimum of 8 characters"
                  />
                  <PasswordStatusItem
                    isValid={passwordChecks.isComplex}
                    text="Uppercase, lowercase letters, one number & special character"
                  />
                </ul>
              );
            })()}
          </div>
        )}

        {/* OTP Button */}
        {showSendOtpButton && (
          <button
            type="button"
            className={`send-otp-btn ${
              otpTimer !== 0 ? "disable-send-btn" : ""
            }`}
            onClick={handleSendCode}
            disabled={otpTimer !== 0}
          >
            {otpTimer === 0
              ? "Send Code"
              : `Resend in ${formatTimer(otpTimer)}`}
          </button>
        )}
      </div>
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  showErrorMsg: PropTypes.bool,
  errorMsg: PropTypes.string,
  checkValidation: PropTypes.bool,
  showPasswordIcons: PropTypes.bool,
  showPasswordCondition: PropTypes.bool,
  showSendOtpButton: PropTypes.bool,
  handleSendCode: PropTypes.func,
  otpTimer: PropTypes.number,
  infoNote: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default FormInput;
