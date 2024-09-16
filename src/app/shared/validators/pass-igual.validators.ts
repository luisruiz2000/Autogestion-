import { FormGroup } from '@angular/forms';

// Valida si dos campos son iguales
export function PassIgualValidator(pass: string, passConfirmacion: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[pass];
        const matchingControl = formGroup.controls[passConfirmacion];
        
        if (matchingControl.errors && !matchingControl.errors['passwordMatch']) {
            // Return if another validator has already found an error on the matchingControl
            return;
        }
        // Set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ passwordMatch: true });
            control.setErrors({ passwordMatch: true });
        } else {
            matchingControl.setErrors(null);
            control.setErrors(null);
        }
    };
}

export function changePassValidator(oldPass: string, newpass: string, passConfirmacion: string) {
    return (formGroup: FormGroup) => {
        const oldPasscontrol = formGroup.controls[oldPass];
        const newPasscontrol = formGroup.controls[newpass];
        const confPasscontrol = formGroup.controls[passConfirmacion];
        const valueOldPass: string = oldPasscontrol.value;
        const valueNewPass: string = newPasscontrol.value;
        const valueConfPass: string = confPasscontrol.value;
        if (valueConfPass.length > 0 || valueNewPass.length > 0 || valueOldPass.length > 0) {
            if (valueOldPass.length > 0) {
                if (oldPasscontrol.valid) {
                    oldPasscontrol.setErrors(null);
                } else {
                    //error old
                }
            } else {
                oldPasscontrol.setErrors({ ContrasenaError: true });
            }
            if (valueNewPass.length > 0) {
                if (newPasscontrol.valid) {
                    newPasscontrol.setErrors(null);
                } else {
                    //error old
                }
            } else {
                newPasscontrol.setErrors({ ContrasenaError: true });
            }
            if (valueConfPass.length > 0) {
                if (confPasscontrol.valid) {
                    confPasscontrol.setErrors(null);
                } else {
                    //error old
                }
            } else {
                confPasscontrol.setErrors({ ContrasenaError: true });
            }
        } else {
            oldPasscontrol.setErrors(null);
            newPasscontrol.setErrors(null);
            confPasscontrol.setErrors(null);
        }
    };
}

