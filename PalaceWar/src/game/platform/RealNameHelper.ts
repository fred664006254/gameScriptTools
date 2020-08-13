
namespace RealNameHelper {
        export function RealnameSdkInputView(opt:{name:string,id: string,errorMsg:string, success: (name, id) => void,cancel: () => void,obj:any}):void{
            ViewController.getInstance().openView(ViewConst.POPUP.REAlNAME3POPUPVIEW, opt);
        }
        export function showTip(msg:string):void
        {
            App.CommonUtil.showTip(msg);
        }
}
