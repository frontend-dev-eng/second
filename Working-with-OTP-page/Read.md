The reason your **PhoneInput** is not getting focus by default is that the `react-phone-input-2` library doesn't directly pass the `autoFocus` prop to the actual `<input>` element inside. Even though you set `autoFocus={autoFocus}`, it doesn't apply to the internal input field.

### ✅ **Working Solution: Use `inputProps` prop to pass `autoFocus`**

`react-phone-input-2` provides an `inputProps` prop to pass props directly to the internal `<input>`.

---

### **Corrected Code for AutoFocus:**

```jsx
<PhoneInput
    country={location?.country || 'in'}
    value={value}
    containerClass='container'
    inputClass={`phoneInput ${hasError ? 'error-border' : ''}`}
    dropdownClass='dropdown'
    dropdownStyle={{ color: 'black' }}
    specialLabel=''
    placeholder={t('enterMobileNumber')}
    onChange={handleSetMobile}
    countryCodeEditable={false}
    inputProps={{
        autoFocus: autoFocus,
    }}
    onKeyDown={(event) => handleKeyEvents(event)}
/>
```

---

### ✅ **Summary:**

* `inputProps` ensures `autoFocus` and `disabled` apply to the actual `<input>`.
* Your `autoFocus={true}` will now correctly focus the input when the component mounts.

---

**Optional:** You can also control focus via a `ref` if you want to programmatically manage it. Let me know if you want that approach too.

