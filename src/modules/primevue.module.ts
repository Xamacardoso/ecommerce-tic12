import type { App } from "vue";
import { Button, Card, InputNumber, DataView, ConfirmationService } from 'primevue'
import ConfirmDialog from "primevue/confirmdialog";
import PrimeVue from "primevue/config";
import Aura from '@primeuix/themes/aura';


export default function setPrimeVue(app: App) : void {
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.dark'
            }
        }
    });

    app.use(ConfirmationService); // habilitando o serviço de confirmacao

    // componentes
    app.component("Button", Button);
    app.component("Card", Card);
    app.component("InputNumber", InputNumber);
    app.component("DataView", DataView);
    app.component("ConfirmDialog", ConfirmDialog);
}