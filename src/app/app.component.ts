import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CryptoInstrumentsParentModule } from './components/crypto-instruments-parent/crypto-instruments-parent.module'
import { CoreModule } from './core/core.module'
import { ExchangeServerTimeModule } from './components/exchange-time/exchange-time.component.module'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CryptoInstrumentsParentModule, CoreModule, ExchangeServerTimeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CryptoChecker';
}
