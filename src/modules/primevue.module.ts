import type { App } from "vue";
import { Button, Card, InputNumber, DataView, ConfirmationService, Menubar, Menu, DataTable, Column, Breadcrumb, InputText, Password } from 'primevue'
import ConfirmDialog from "primevue/confirmdialog";
import PrimeVue from "primevue/config";
import Aura from '@primeuix/themes/aura';
import BadgeDirective from "primevue/badgedirective";

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
    app.component("Menubar", Menubar);
    app.component("Menu", Menu);
    app.component("DataTable", DataTable);
    app.component("Column", Column);
    app.component("Breadcrumb", Breadcrumb);

    // usa o badge
    app.directive("badge", BadgeDirective);

    app.component("InputText", InputText);
    app.component("Password", Password);
}