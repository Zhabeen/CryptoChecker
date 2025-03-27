import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { CryptoInstrumentsParentComponent } from "./crypto-instruments-parent.component" 
import { FormsModule } from "@angular/forms"
import { CoreModule } from "../../core/core.module"
import { ExchangeServerTimeModule } from "../exchange-time/exchange-time.component.module"

@NgModule({
    declarations: [CryptoInstrumentsParentComponent],
    imports: [CommonModule, FormsModule, CoreModule, ExchangeServerTimeModule],
    exports: [CryptoInstrumentsParentComponent]
})

export class CryptoInstrumentsParentModule {}