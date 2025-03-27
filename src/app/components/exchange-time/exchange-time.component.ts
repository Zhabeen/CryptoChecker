import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, interval, Observable, of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-exchange-time',
  templateUrl: './exchange-time.component.html'
})
export class ExchangeTimeComponent implements OnInit {
  private serverTimeSubject = new BehaviorSubject<Date>(new Date())
  currentExchangeTime$: Observable<Date> = interval(1000).pipe(
    map(() => new Date())
  )
  binanceTime$!: Observable<Date>
  bybitTime$!: Observable<Date>
  okxTime$!: Observable<Date>
  exchangeTime$!: Observable<Date>
  @Input() selectedExchange: string | undefined

  constructor(private http: HttpClient) {}

  ngOnInit(): void {    
    this.loadServerTimes()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedExchange']) {
      this.loadServerTimes()
    }
  }

  // Запрос времени сервера в зависимости от выбранной биржи
  loadServerTimes(): void {
    switch (this.selectedExchange) {
        case 'binance':
          this.binanceTime$ = this.getServerTime('https://api.binance.com/api/v3/time')
          break;
        case 'bybit':
          this.bybitTime$ = this.getServerTime('https://api.bybit.com/v5/market/time')
          break;
        case 'okx':
          this.okxTime$ = this.getServerTime('https://www.okx.com/api/v5/public/time')
          break;
      }
  }

  // Логика обработки времени и прибавки к полученному времени по секунде
  getServerTime(url: string): Observable<Date> {
    return this.http.get<{ serverTime?: number; time?: number; data?: { ts: string }[] }>(url).pipe(
      map((response) => {
        const serverTimestamp =
          response.serverTime ||
          response.time ||
          (response.data?.[0]?.ts ? parseInt(response.data[0].ts) : 0)
        return new Date(serverTimestamp)
      }),
      catchError(() => of(new Date()))
    ).pipe(
      switchMap((serverTime) => {
        this.serverTimeSubject.next(serverTime)
        return interval(1000).pipe(
          map(() => {
            const currentTime = this.serverTimeSubject.value;
            if (currentTime) {
              const updatedTime = new Date(currentTime.getTime() + 1000);
              this.serverTimeSubject.next(updatedTime)
              return updatedTime
            }
            return currentTime
          })
        )
      })
    )
  }

  changeExchange(selected: string): void {
    this.selectedExchange = selected
  }
}
