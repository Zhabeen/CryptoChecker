import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError, map, tap, finalize } from 'rxjs/operators'
import { Instrument } from '../interfaces/crypto-instruments.interface'
import { filterData } from '../../utils/filter-util'
import { sortData } from '../../utils/sortdata-util'
import { shouldLoadMore } from '../../utils/scroll-util'
import { EXCHANGE_CONFIGS } from '../../configs/exchange-config'

@Component({
  selector: 'app-crypto-instruments-parent',
  templateUrl: './crypto-instruments-parent.component.html',
  styleUrls: ['./crypto-instruments-parent.component.scss']
})
export class CryptoInstrumentsParentComponent implements OnInit {
  selectedExchange: 'binance' | 'bybit' | 'okx' = 'binance'
  instruments$!: Observable<Instrument[]>
  instruments: Instrument[] = []
  displayedInstruments: Instrument[] = []
  errorMessage: string | null = null
  isLoading: boolean = false
  hasMoreData: boolean = true

  filterText: string = ''
  priceSortAsc: boolean = true
  timeSortAsc: boolean = false
  currentExchangeTime: Date = new Date()
  private pageSize: number = 10
  displayCount: number = 10

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadInstruments()
  }

  switchExchange(exchange: 'binance' | 'bybit' | 'okx'): void {
    this.selectedExchange = exchange
    this.loadInstruments()
  }

  loadInstruments(): void {
    if (this.isLoading || !this.hasMoreData) return
    this.isLoading = true

    this.instruments$ = this.fetchInstruments(this.selectedExchange).pipe(
      tap(data => {
        this.instruments = data
      }),
      finalize(() => {
        this.isLoading = false
      })
    )
  }

  // Загрузка данных по API, которое берем из конфига
  fetchInstruments(exchange: string): Observable<Instrument[]> {
    const config = EXCHANGE_CONFIGS[exchange]
  
    if (!config) {
      console.error(`Неизвестная биржа: ${exchange}`)
      return of([])
    }
  
    return this.http.get<any>(config.url).pipe(
      map(data => config.mapResponse(data)),
      catchError(err => {
        console.error('Ошибка загрузки данных', err)
        this.errorMessage = 'Не удалось загрузить данные с сервера'
        return of([])
      })
    )
  }
  
  changeExchange(): void {
    this.loadInstruments()
  }

  // Поиск по инструментам
  getFiltered(): Instrument[] {
    return filterData(this.instruments, this.filterText, 'symbol')
  }

  // Обращения к утилитам сортировок, скролла, обработка случаев, когда openTime или closeTime не пришли по API
  sortByPrice(): void {
    this.instruments = sortData(this.instruments, 'lastPrice', this.priceSortAsc)
    this.priceSortAsc = !this.priceSortAsc
  }

  sortByTime(timeField: 'openTime' | 'closeTime'): void {
    this.instruments = sortData(this.instruments, timeField, this.timeSortAsc)
    this.timeSortAsc = !this.timeSortAsc
  }

  onScroll(event: any): void {
    if (shouldLoadMore(event) && !this.isLoading && this.hasMoreData) {
      this.displayCount += this.pageSize
    }
  }

  hasNoOpenTime(instruments: Instrument[]): boolean {
    return instruments.every(inst => inst.openTime === 0);
  }

  hasNoCloseTime(instruments: Instrument[]): boolean {
    return instruments.every(inst => inst.closeTime === 0);
  }
}
