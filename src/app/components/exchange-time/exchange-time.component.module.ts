import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ExchangeTimeComponent } from "./exchange-time.component"
import { FormsModule } from "@angular/forms"
import { CoreModule } from "../../core/core.module"

@NgModule({
    declarations: [ExchangeTimeComponent],
    imports: [CommonModule, FormsModule, CoreModule],
    exports: [ExchangeTimeComponent]
})

export class ExchangeServerTimeModule {}