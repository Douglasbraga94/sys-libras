import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { NbMenuBag, NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { User } from '@supabase/gotrue-js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  itens: NbMenuItem[];
  user: User;
  private destroy$ = new Subject<void>();

  constructor(
    private menuService: NbMenuService,
    private sidebarservice: NbSidebarService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOndestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }


  ngOnInit(): void {
    this.criaMenu();
    this.menuService.onItemClick()
    .pipe(takeUntil(this.destroy$))
    .subscribe((menuBag:NbMenuBag)=>{
      if(menuBag.item.title == 'Sair'){
        this.logout();
      }
    })
  }

  criaMenu() {
    this.itens = [
      {
        title: 'Dashboard',
        icon: 'bar-chart-outline',
        link: 'home'
      },
      {
        title: 'Regionais',
        icon: 'home',
        link: 'regional'
      },
      {
        title: 'Intérpretes',
        icon: 'people',
        link: 'interpretes'
      },
      {
        title: 'Sair',
        icon: 'person-remove-outline',
        link: ''
      }    
    
    ]
  }

  toogle(){
    this.sidebarservice.toggle(true, 'menu-main');
  }

  logout(){
    this.usuarioService.signOut()
    .then((value)=>{
      if(!value.error){
        localStorage.removeItem('@sys-libras:user'); 
        this.router.navigate([ '/login']);
      }
    })
  }

}
