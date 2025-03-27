import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { PriceFormatPipe } from "./pipes/price-format.pipe"
import { TradeVolumePipe } from "./pipes/trade-volume.pipe"
import { TimeFormatPipe } from "./pipes/time-format.pipe"

@NgModule({
    declarations: [PriceFormatPipe,TradeVolumePipe, TimeFormatPipe],
    exports: [PriceFormatPipe, TradeVolumePipe, TimeFormatPipe],
    imports: [CommonModule]
})

export class CoreModule {}