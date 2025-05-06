// import { CiUser ,CiGift, CiAlignRight,} from "react-icons/ci";

class NaveBarItem{
    title?:string;
    link?:string;
    icon?:string ;
    isHeader?:boolean;
    constructor(title?: string, link?: string, icon?: string ,isHeader?:boolean) {
        this.title=title;
        this.link=link;
        this.icon=icon;
        this.isHeader=isHeader;
    }
   
}
 class NavBarData{
    items:NaveBarItem[]|undefined;
    dashboardTitle:string|undefined;
    constructor(items?:NaveBarItem[],dashboardTitle?:string){
        this.items=items;
        this.dashboardTitle=dashboardTitle;
    }

  
}

export {NaveBarItem,NavBarData}