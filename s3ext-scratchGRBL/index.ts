//#region  Heads
// @ts-ignore
var ArgumentType = Scratch.ArgumentType;

// @ts-ignore
var BlockType = Scratch.BlockType;
// @ts-ignore
var formatMessage = Scratch.formatMessage;
// @ts-ignore
var Log = Scratch.log;
// @ts-ignore
var React = Scratch.React;
// @ts-ignore
//import readline from 'readline';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
var RunTime:any = null;
var consoleOn = false;


function AlertError(text:string,returnValue:any=null){
    //@ts-ignore
    RunTime.emit("showAlert", {
        type: "error",
        msg: text
    })
    return returnValue;
}
function AlertInfo(text:string,returnValue:any=null){
    //@ts-ignore
    RunTime.emit("showAlert", {
        type: "error",
        msg: text
    })
    return returnValue;
}

const menuIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGxSURBVDhPpZTLTgIxFIY7gMYL6oYFvoJbFoSwIcwEQphhNzyAa3duTXgCn8BHIK6MxoSJe5Y+hbqTeAGjQ+3ftOV0oF7CnzT9Z9p+Pac3ptVoNArKWj6O47yykKeKVk7V1hjW6VT3lWX1en1PWXTaUhbCYAowbcIXlbXJFFyr1baVFVGyPIr6tNromDg+2lTWDROyInPBgiA4UNadpopqJazXW4yxYDTlbGQ0TTkR5xKOyKIo6sNTmJXyr2kCdv/CC+MnLmAp/lNYNkorzewGhGE41zDUKE5Y5pwtRybUarV2wyg0sML4kcsOQtmUzSFFVMMhQ8c5vgErlUrvnueV0/TzfGeneDydzT5uzy7YV7UsxwGWJMkk66GlDeCDQS4d+dMIkQl1u93ndrt9KNMXcqYshNmsNAHjic/fbnyOWmyCc82or1QqG6hN2nrN0lHzRMNQJlf+DFC0uWD0kEtpGIRGfhf0AXu99lduwI8wemxwA3Q0D5fNU/lT6I8wuQ9m/WijC0A9vX40Q6n/wmj/JZhI2bxna8I8wMzjsCYMS7d4zelL4fL6nCnRKwuQKIx9A7vBwl6UCsXuAAAAAElFTkSuQmCC";
const blockIcon = menuIcon

function getEnum<T>(myenum:any,enumValue: number | string):string {
    return myenum[enumValue as keyof typeof myenum];
}

enum EmEcho{Nothing,ok,error,WaitSomeTime}
enum EmG{G0 = 'G0', G1 = 'G1', '$J=' = "$J="}
enum EmLoca{Default = 'Default', G90 ='G90', G91 = 'G91'}
enum EmAxis{X,Y,Z,A,B}
enum EmCommandType{System,GCommand,GFileCommand}
enum EmState{DisConnected,Connected,Idle,Jog,Home,Run,Hold,Alarm,Check,Door,Sleep}
enum EmHelpCommand{Help='Help',Clearqueque='Clearqueque',ConsoleOn='ConsoleOn',ConsoleOff='ConsoleOff'}
//enum EmDiySetting{IdleCheckInterval='IdleCheckInterval'}
enum EmGcodeSetAction{Record='Record',StopRecord='StopRecord', Push='Push',Go='Go',Import='Import',Export='Export',ExportAll='ExportAll',Clear='Clear',Delete='Delete',DeleteAll="DeleteAll"}
enum EmCommand{Pause = '!',Resume ='~',Sleep = '$SLP', CancelJOG = '0X85', ResetGRBL = '0x18', SafetyDoor = '0x84',
                    Postion ='?',Help = '$',ViewParameters = '$$' ,ToggleSpindleStop='0x9E',ToggleFloodCoolant='0xA0',
                GoHoming = '$H',KillAlarm = '$X',StartBlocks = '$N',GCodeMode = '$C',ParserState = '$G'}


class Menur{
    static Create(Im:any,myenum:any){
      Im.FormatMsg();
      var menus = [];
      for(let k of Object.keys(myenum)){
          if(Im.MenuMap.has(k)){
              menus.push({
                  text: Im.MenuMap.get(k), value: k
              });
          }
          else
              menus.push({
                  text: k, value: k
              });
  
      }
      return menus;
    }
}

class ImGcodeSetAction{
    static MenuMap = new Map<string,string>();
    static Menu = Menur.Create(ImGcodeSetAction,EmGcodeSetAction);
    static FormatMsg(){
        if(this.MenuMap.size==0){
            this.MenuMap.set(EmGcodeSetAction.StopRecord,"Stop record")
            this.MenuMap.set(EmGcodeSetAction.Import,"Import file")
            this.MenuMap.set(EmGcodeSetAction.DeleteAll,"Delete all");
            this.MenuMap.set(EmGcodeSetAction.ExportAll,"Export all");
            this.MenuMap.set(EmGcodeSetAction.Export,"Export to file");
        }
    }   
}

class ImLoca{
    static MenuMap = new Map<string,string>();
    static Menu = Menur.Create(ImLoca,EmLoca);
    static FormatMsg(){
        if(this.MenuMap.size==0){
            this.MenuMap.set(EmLoca.Default,"")
            this.MenuMap.set(EmLoca.G90,"Absolute");
            this.MenuMap.set(EmLoca.G91,"Offset");
        }
    }  
}

class ImHelpCommand{
    static MenuMap = new Map<string,string>();
    static Menu = Menur.Create(ImHelpCommand,EmHelpCommand);
    static FormatMsg(){
        if(this.MenuMap.size==0){
            this.MenuMap.set(EmHelpCommand.Clearqueque,"Clear queque")
            this.MenuMap.set(EmHelpCommand.ConsoleOff,"Console Off");
            this.MenuMap.set(EmHelpCommand.ConsoleOn,"Console on");
        }
    }  
}

class ImCommand{
    static ValueMap = new Map<EmCommand,string>();
    static CreateValueMap(){
        for(let k of Object.keys(EmCommand)){
            this.ValueMap.set(EmCommand[k as keyof typeof EmCommand],k);   
        }
    }
    static Has(emCommand:EmCommand):boolean{
        return this.ValueMap.has(emCommand);
    }
}

class ImEnumG{
    static Keys = Object.keys(EmG)
    static Count = Object.keys(EmG).length;
    static Menu = ImEnumG.CreateMenu();
    static NonableMenu = ImEnumG.CreateMenu(true);
    static CreateMenu(nonable:boolean=false){
        var menus = [];
        for(let k of this.Keys){
            menus.push({
                text: k, value: k
            });
        }
        if(nonable) {
            menus.push({
                text: '', value: ''
            });            
        }
        return menus;
    } 

}

class Axis{
    constructor(axis:EmAxis = EmAxis.X,value:number = 0 ){
        this.Axis = axis;
        this.Value = value;
    }
    Axis = EmAxis.X;
    Value: number = 0;
    get AxiesName(){
        return ImEnumAxis.Names[this.Axis];
    }
    set AxiesName(name:string){
        this.Axis = ImEnumAxis.Axis(name);
    }
    get Gcode(){
        if(this.Value!=null){
            return ImEnumAxis.Name(this.Axis)+this.Value.toString();
        }
        return '';
    }
    get Copy():Axis{
        return new Axis(this.Axis, this.Value);
    }

}

class ImEnumAxis{
    static Count = Object.keys(EmAxis).length/2;
    static Names =  Object.keys(EmAxis).map((k: any) => EmAxis[k]).filter((v: any) => typeof v === 'string');   
    static Axises =Object.keys(EmAxis).map((k: any) => EmAxis[k]).filter((v: any) => typeof v === 'number').map(Number) 
    static Menu = ImEnumAxis.CreateMenu();
    static Name(axies:number){
        if(axies>-1 && axies<this.Axises.length){
            return ImEnumAxis.Names[axies];
        }
        return null;        
    }
    static Axis(name:string){
        return EmAxis[name as keyof typeof EmAxis];
    }
    static CreateMenu(){
        var menus = [];
        for(var i =0; i<this.Count; i++){
            menus.push({
                text: this.Names[i], value: this.Names[i]
            });
        }
        return menus;
    }
}

interface IGPointArgs { 
    GType:EmG, 
    Feed:number,
    LocateType:EmLoca, 
    Pos0:number,
    Pos1:number,
    Pos2:number,
    Pos3:number,
    Pos4:number,
} 

class GPoint{
    Axises = new Array<Axis>();
    G = EmG.G0;
    LocateType = EmLoca.G90;
    Others:string = null;// info other then the first G and axises info
    Feed:Number = null;
    Error:string=null;
    get IsError(){
        return this.Error!=null;
    }
    //private prePoint:GPoint=null;
    private gcode:string = null;
    constructor(axisized:boolean = false){
        if(axisized)
            this.Axisize(); 
    }
    Axis(enAxis:EmAxis,force=true){
        for(let v of this.Axises){
            if(v.Axis==enAxis) return v;
        }
        if(!force) return null;
        var v = new Axis(enAxis);
        this.Axises.push(v);
        return v;
    }
    Axis_ByName(axiesName:string,force=true){
        var axies = ImEnumAxis.Axis(axiesName);
        return this.Axis(axies,force);
    }
    Axisize(){
        this.Axises.length =0;
        for(var i =0; i<ImEnumAxis.Count; i++){
            this.Axises.push(new Axis(i,0));
        }
    }
    get Copy():GPoint{
        var copy = new GPoint;
        for(let v of this.Axises){
            copy.Axises.push(v.Copy);
        }
        return copy;
    }

    set Gcode(gcode:string){
        this.gcode = gcode;
    }
    get Gcode(){
        if(this.gcode!=null)return this.gcode;
        var gode = '';
        for(let A of this.Axises)
            gode += ' '+ A.Gcode;
        if(this.Feed!=null && this.Feed>0)
            gode+=' F'+this.Feed.toString();
        if(this.G==EmG['$J='])
            gode =  this.G as string + gode.substring(1);
        else
            gode =  this.G as string+ gode;
        if(this.LocateType!=EmLoca.Default)
            return gode+' '+this.LocateType;
        return gode;
    }
    // ParseGcode(text:string){
    //     this.gcode = text;
    //     this.Axises.length =0;
    //     if(text==null)  return;
    //     var lns = text.split(' ');
    //     if(lns.length>1){
    //         this.G = lns[0] as EmG;
    //         for(let i=0; i< lns.length-1;i++){
    //             var axies = ImEnumAxis.Axis(lns[i].charAt(0));
    //             if(axies){
    //                 var loca = new Axis(axies,parseFloat(lns[i].substring(1)));
    //                 this.Axises.push(loca);
    //             }
    //             else{
    //                 if(this.Others=null)
    //                     this.Others=lns[i];
    //                 else
    //                     this.Others+=" "+lns[i];
    //             }
    //         }
    //     }
    // }
    ParseArgs(args:IGPointArgs){
        this.G =  args.GType;//as EnumG;
        this.LocateType = args.LocateType; 
        this.Feed = args.Feed;
        if(this.G==EmG['$J='] || this.G == EmG.G1 ){
            if(args.Feed==null){
                this.Error = "$J= or G1 command need Feed";
            } 
            else if(args.Feed <1 ){
                this.Error = "$J= or G1 command need Feed";;
            }
        }
        for(var i=0;i<ImEnumAxis.Count;i++){
            var pos; eval("pos = args.Pos"+i.toString());
            if(pos!='')this.Axis(i).Value =parseFloat(pos)
        }
        this.gcode = this.Gcode;
        return this;      
    }
}

class Command
{
    Text:string =null;
    Machine:Machine;
    Echoed = false;
    EchoType = EmEcho.ok;
    Echoes = new Array<string>();
    TimeToEcho = 500; //milliseconds, for those commands with echoes and need sometime to finished

    Reporter: any = null;
    Result: any = null;

    EstimatedTime =0;


    constructor(text:string=null){
        if(text==null)return;
        this.Text = text; 
        if(text.startsWith("!")) this.EchoType = EmEcho.Nothing;
        if(text.startsWith("$SLP")) this.EchoType = EmEcho.Nothing;
    }
    get ToCom ():string{return this.Text;} // Return content for witing to machine com serial port
    Info(){console.info("Command: ", this.Text, typeof this);}
    OnMessaged(line:string){}
    Message(line:string){this.Echoes.push(line); this.OnMessaged(line);}
    OnEchoed(){}
    EchoToConsole(){
        if(this.Result==null){
            return this.Echoes.join(" > ");
        }
        else{
            return  this.Result,this.Echoes.join(" > ");
        }      
    }
    Echo(reportIt:boolean=true){
        this.Echoed = true;     
        this.OnEchoed();
        if(consoleOn) console.info( this.ToCom," >> ",this.EchoToConsole());
        if(reportIt) this.Report();
    }   
    Report(){
        //console.info("Echoed:", this.Text,getEnumKey(EnumCommandType, this.EchoType), this.Result);
        if( this.Reporter!=null) {
            this.Reporter(this.Result);
            this.Reporter =null;
        }
    }
    
}

class GFileCommand extends Command{
    FilePath:string
    Gcodes = new Array<string>()
    PopIndex =0
    FileReaded = false;
    get Type(){return EmCommandType.GFileCommand;}
    get HasMore(){return this.PopIndex < this.Gcodes.length;}
    Pop(){ return new GCommand(this.Gcodes[this.PopIndex++]); }
    ReadSyncFromFile(filePath:string){
        if (fs.existsSync(filePath)){
            let contents = fs.readFileSync(filePath, 'utf8');
            this.PopIndex = 0;
            this.Gcodes = contents.split('\r\n');
            this.FileReaded = true;
            return true;
        }
        return false
    } 
}

class GCommand extends Command{
    GPoint=new GPoint();
    get Type(){return EmCommandType.GCommand; }
    constructor(gcode:string = null){
        super(gcode);
        //if(gcode!=null) if (gcode!='') this.ParseGcode();
    }
    get ToCom():string{
        if(this.Text != null){
            return this.Text;
        }
        else{
            return this.GPoint.Gcode;
        }        
    }
    //ParseGcode(){this.GPoint.ParseGcode(this.Text);}
}

class GWaitCommand extends GCommand{
    Interval=50;//millisecond
    Idle=false;
    WaitFor:Command;
    constructor(){
        super('?');
        //if(gcode!=null) if (gcode!='') this.ParseGcode();
    }
    OnMessaged(line:string){
        if(line.startsWith("<")){
            this.Machine.Status.Parse(line);
            if(this.Machine.Status.State == EmState.Idle || this.Machine.Status.State ==  EmState.Sleep){
                this.Idle=true;
                this.Result=0;
            }
         }
    }
    EchoToConsole(){
        if(this.Idle) {return "Idle"}
        else return "waiting"
    }
    Report(){
        if(this.Idle) {
            if(this.WaitFor) {
                this.Result=this.WaitFor.Result;
            }
            super.Report();
        }
    }
}

class GcodeSet{    
    Name = 'Default';
    Gcodes = new Array<string>();
    constructor(name:string){
        this.Name=name;
    }
    Export(path:string){
        if(path.toLowerCase().startsWith("c")) 
        {
            AlertError("Can not export to C disk: "+path)
            return;
        }            
        fs.writeFile(path, this.ToText,  function(err:any) {
            if (err) {
                AlertError(err);
            }
        });
    }
    get ToText(){
        return this.Gcodes.join("\r\n");
    }
    Import(path:string){
        let contents = fs.readFileSync(path, 'utf8');
        var Gcodes = contents.split('\r\n');   
        for(let g in Gcodes){
            this.Gcodes.push(g)
        }    
    }
    Clear(){
        this.Gcodes.length=0;
    }
}

class MachineSetting
{
    ID = '0';   Value = 10;   Name = "";   Note = "";
    constructor(id:string='0', value: number=10){this.ID =id;  this.Value = value;}
    get Command(){return new Command("$"+this.ID.toString()+"="+this.Value.toString());}
}

class MachineStatus{
    Line = "";//<Idle|MPos:0.000,0.000,0.000,0.000,0.000|FS:0,0|WCO:100.000,0.000,0.000,0.000,0.000>
    Position = new GPoint(true);//MPos
    WPosition = new GPoint(true);//wco
    OVPosition = new GPoint(true);//ov
    Feed0 = 0;//FS
    Feed1 = 1;//FS
    State = EmState.Idle;
    get Name(){ return getEnum(EmState,this.State);}
    get IsIdle():boolean{return this.State == EmState.Idle;}
    Parse(line:string){
        this.Line = line;
        var lns = line.substring(1,line.length-2).split("|");
        //MPos
        var xyz = lns[1].substring(lns[1].indexOf(':')+1).split(',');
        this.State = EmState[lns[0] as keyof typeof EmState]
        for(var i = 0;i<ImEnumAxis.Count;i++){
            this.Position.Axises[i].Value=parseFloat(xyz[i]);
            //console.info(this.Position.Locations[i].Position);
        }
        //Feeds
        if(lns.length>2){
            var fs = lns[2].split(':')[1].split(',');
            this.Feed0 = parseInt(fs[0]);
            if(fs.length>1) this.Feed1 = parseInt(fs[1]);

        }
        //WPos or ov
        if(lns.length>3){
            var name_Poses = lns[3].split(':');
            var point = this.WPosition;
            if(name_Poses[0]=='OV')   point = this.OVPosition;
            var poses = name_Poses[1].split(',')
            for(var i = 0; i<poses.length; i++){
                point.Axises[i].Value=parseFloat(poses[i]);
            }
        }
    }
    AxisValue(AxiesName:string){
        var loc = this.Position.Axis_ByName(AxiesName,false);
        if(loc)  return loc.Value;
        return 0;
    }
}
//#endregion
class Machine {
    //#region  BASES
    GRBL:ScratchGRBL;
    Version = '';
    MSG ='';
    N0:string = '';
    N1:string = '';
    Infomation ='';
    Settings = new Map<string,MachineSetting>();

    DefaultIdleCheckInterval=100;

    FinalTarget = new GPoint(true);
    Status = new MachineStatus();

    Commands = new Array<Command>();
    GCommands = new Array<Command>();
    RunedCommandCount = 0;
    //WaitCommands = new Array<Command>();
    Last:Command = null;
    private current: Command = null;
    CurrentGFileCommand:GFileCommand = null;
    CurrentWaitCommand:GWaitCommand=null;



    DefaultGcommandSet = new GcodeSet("Gcodes");

    constructor() { this.InitSettings();this.GcodeSets.set(this.DefaultGcommandSet.Name,this.DefaultGcommandSet) }    
    get Connected(){ return this.Status.State>EmState.DisConnected;}
    get Current(){ return this.current; }

    set Current(cmd:Command){
        this.Last = this.current;
        this.current = cmd;
    }
    Com_Write(data:any){ }
    Com_Read(line:string){
        //console.info("->",line);
        if(this.RunedCommandCount==0){
            if(this.Version ==''){
                this.Version = line;
                if(consoleOn) console.info(line);
                return;
            }
            if(line.startsWith('[MSG:')){
                this.MSG = line;
                if(consoleOn) console.info(line);
                return;
            }

            if(this.N0=='') this.N0=line.substring(1,line.length-3);
            else this.N1=line.substring(1,line.length-3);
            if(consoleOn) console.info(line);
            return;
        }
        if(!this.Current){
            if(consoleOn) console.info(line);
        }
        else {//if has done 
            switch (this.Current.EchoType) {
                case EmEcho.ok:
                    if(line == "ok") { 
                        this.Current.Echo();
                        this.TryPopWrite();
                        return;                     
                    }
                    else if(line.startsWith("error")){
                        AlertError(line);
                        console.error(line);
                        this.current.Info();

                        this.Current.Echo();
                        this.Current = null;
                        this.TryPopWrite();
                        return;
                    }
                    break;
                default:
                    break;
            }
            this.Current.Message(line);
            //this.TryPopWrite(); 
        }
    }
    InitSettings(){
        var e = this;
        var InitSetting = function(id:number,name:string){
            var setting = new MachineSetting();
            setting.ID = id.toString();
            setting.Name = name;
            e.Settings.set(setting.ID,setting);
        };
        InitSetting(0,"Step pulse, microseconds");
        InitSetting(1,"Step idle delay, milliseconds");
        InitSetting(2,"Step port invert, mask");
        InitSetting(3,"Direction port invert, mask");
        InitSetting(4,"Step enable invert, boolean");
        InitSetting(5,"Limit pins invert, boolean");
        InitSetting(6,"Probe pin invert, boolean");
        InitSetting(10,"Status report, mask");
        InitSetting(11,"Junction deviation, mm");
        InitSetting(12,"Arc tolerance, mm");
        InitSetting(13,"Report inches, boolean");
        InitSetting(20,"Soft limits, boolean");
        InitSetting(21,"Hard limits, boolean");
        InitSetting(22,"Homing cycle, boolean");
        InitSetting(23,"Homing dir invert, mask");
        InitSetting(24,"Homing feed, mm/min");
        InitSetting(25,"Homing seek, mm/min");
        InitSetting(26,"Homing debounce, milliseconds");
        InitSetting(27,"Homing pull-off, mm");
        InitSetting(30,"Max spindle speed, RPM");
        InitSetting(31,"Min spindle speed, RPM");
        InitSetting(32,"Laser mode, boolean");
        InitSetting(100,"X steps/mm");
        InitSetting(101,"Y steps/mm");
        InitSetting(102,"Z steps/mm");
        InitSetting(103,"A steps/mm");
        InitSetting(104,"B steps/mm");
        InitSetting(110,"X Max rate, mm/min");
        InitSetting(111,"Y Max rate, mm/min");
        InitSetting(112,"Z Max rate, mm/min");
        InitSetting(113,"A Max rate, mm/min");
        InitSetting(114,"B Max rate, mm/min");
        InitSetting(120,"X Acceleration, mm/sec^2");
        InitSetting(121,"Y Acceleration, mm/sec^2");
        InitSetting(122,"Z Acceleration, mm/sec^2");
        InitSetting(123,"A Acceleration, mm/sec^2");
        InitSetting(124,"B Acceleration, mm/sec^2");
        InitSetting(130,"X Max travel, mm");
        InitSetting(131,"Y Max travel, mm");
        InitSetting(132,"Z Max travel, mm");
        InitSetting(133,"A Max travel, mm");
        InitSetting(134,"B Max travel, mm");
    }
    Menu_Setting(){
        var menus = [{text:'Settings',value:"-1"}   ,{text:this.Version,value:"-2"}];
        //if(this.MSG!='')
        //    menus.push({text:this.MSG,value:"-6"});
        menus.push({text:"$N0="+this.N0,value:"-3"});
        menus.push({text:"$N1="+this.N1,value:"-4"});
        menus.push({text:"$I="+this.Infomation,value:"-5"});
        menus.push();
        for(let param of this.Settings.values()){
            menus.push({
                text: "$"+param.ID.toString()+"=" + param.Value.toString()+" "+ param.Name
                , value: param.ID
            });
        }
        return menus;
    }
    TryPop():Command{
        if(this.Commands.length>0){
            return this.Commands.shift();
        }

        if(this.CurrentWaitCommand){
            if(this.CurrentWaitCommand.Echoed){
                if(this.CurrentWaitCommand.Idle){
                    this.CurrentWaitCommand=null;
                }
                else{
                    this.CurrentWaitCommand.Echoed=false;
                    var e = this;
                    var waitcommand = this.CurrentWaitCommand;        
                    setTimeout(function () { 
                        e.Push(waitcommand);
                    }, this.CurrentWaitCommand.Interval)
                    return;
                }
            }
            else{
                return;
            }
        }

        if(this.CurrentGFileCommand){
            if(this.CurrentGFileCommand.HasMore){                
                var gfcmd = this.CurrentGFileCommand.Pop();
                //this.ConsumeGCommand(gfcmd);
                return gfcmd;
            }
            else{
                // console.info("has no more file command");
                this.CurrentGFileCommand=null;
            }
        }

        if(this.GCommands.length>0){
            var cmd = this.GCommands.shift() as Command;
            if(cmd instanceof GWaitCommand){
                this.CurrentWaitCommand = cmd;               
                return cmd;
            }
            else if (cmd instanceof GFileCommand ){                
                this.CurrentGFileCommand = cmd as GFileCommand;
                //console.info("GCodes Length",this.CurrentGFileCommand.Gcodes.length)
                return this.TryPop();
            }
            else{
                //this.ConsumeGCommand(cmd as GCommand);
                return cmd;
            }
        }
        return null;
    }
    TryPopWrite(){
        if(this.Current == null){
            var cmd = this.TryPop();
            if(cmd!=null){
                this.RunedCommandCount++;
                this.Current = cmd;
                //this.Current.Info();
                this.Com_Write(this.Current.ToCom);
                switch (this.Current.EchoType) {
                    case EmEcho.Nothing:
                        this.Current.Echo();
                        this.Current = null;
                        this.TryPopWrite();
                        break;
                    case EmEcho.WaitSomeTime:
                        var e = this
                        setTimeout(function () {
                            e.Current.Echo();
                            e.Current = null;
                            e.TryPopWrite();
                        }, e.Current.TimeToEcho)
                        break;
                    default:
                        break;
                }
            }
        }
        else if(this.Current.Echoed){
            this.Current = null;
            this.TryPopWrite();
        }
    }
    Connect(){
        if(this.Version.indexOf("Grbl 1.1")<0){
            this.Status.State = EmState.DisConnected;// .Connected = true;
            return;
        }
        else{
            this.Status.State = EmState.Connected;// .Connected = true;
        }        
        this.Push_For_Information();    
        if(this.MSG.indexOf("to unlock")>0){
            this.Push(new Command("$X"));
            this.MSG='';
        }
        this.Push_For_Settings();
    }
    Disconnect() {
        this.Version ='';
        this.MSG ='';
        this.Infomation='';
        this.N0 ='';
        this.N1='';
        this.Status.State = EmState.DisConnected;
        this.ClearCommands();
    }

    ClearCommands(){
        this.Commands.length = 0;
        this.GCommands.length = 0;
        this.CurrentGFileCommand=null;
        this.CurrentWaitCommand = null;
        if(this.current){
            this.current.Echo();
            this.current = null;
        }
        this.RunedCommandCount =0;
    }

    Push(cmd:Command){
        this.Commands.push(cmd);
        this.TryPopWrite();
    }
    PushG(gcmd:GCommand){
        this.GCommands.push(gcmd);
        this.Recordings.forEach((value, key) => {
            value.Gcodes.push(gcmd.ToCom);
        });
        this.TryPopWrite();
    }
    PushFileG(gcmd:GFileCommand){
        this.GCommands.push(gcmd);
        this.TryPopWrite();
    }

    GetWaitCommand(waitFor:Command=null,interval:number=null){
        var waitcommand = new GWaitCommand();
        waitcommand.Machine=this;
        waitcommand.WaitFor=waitFor;
        if(interval!=null) waitcommand.Interval=interval;
        else waitcommand.Interval=this.DefaultIdleCheckInterval;
        return waitcommand;
    }

    ReportWaitCommandForG(cmd:GCommand=null,interval:number=null){
        if(cmd) this.PushG(cmd);
        return this.ReporterG(this.GetWaitCommand(cmd,interval));   
    }

    Reporter(cmd:Command){
        var e = this;
        return new Promise(function (r) {
            cmd.Reporter = r,
            e.Push(cmd)
        })
    }
    ReporterG(cmd:GCommand){
        var e = this;
        return new Promise(function (r) {
            cmd.Reporter = r,
            e.PushG(cmd)
        })
    }

    Push_For_Settings(){
        var cmd = new Command("$$");
        cmd.Machine = this;        
        cmd.OnMessaged = function(line:string){
            if(line.startsWith("$")){
                var ID = line.substring(1,line.indexOf('='));
                if(this.Machine.Settings.has(ID)){
                    var setting = this.Machine.Settings.get(ID);         
                    setting.Value = parseFloat(line.substring(line.indexOf("=")+1));
                }
                else{
                    var setting = new MachineSetting();
                    setting.ID = ID;
                    setting.Value = parseFloat(line.substring(line.indexOf("=")+1));
                    setting.Name = "none";
                    this.Machine.Settings.set(setting.ID,setting);
                }

            }
            cmd.Result = this.Machine.Settings.size.toString()+" settings got.";
        }
        this.Push(cmd);
    }
    Push_For_Information(){
        var cmd = new Command("$I");
        cmd.Machine = this; 
        //@ts-ignore
        cmd.firstLine = true;
        cmd.OnMessaged = function(line:string){
            //@ts-ignore
            if(cmd.firstLine){
                cmd.Machine.Infomation = line.substring(1,line.length-1).split(":")[2];
                //@ts-ignore
                cmd.firstLine = false;
            }
            cmd.Result = cmd.Machine.Infomation;
        }
        this.Push(cmd);
    }
    Push_For_Set_Information(information:string){
        var cmd = new Command("$I="+information);
        this.Infomation = information;
        this.Push(cmd);
    }

    GcodeSets = new Map<string,GcodeSet>();
    GetGcodeSet(name:string,force=false){
        if(!name) return null;
        if(this.GcodeSets.has(name)){
            return this.GcodeSets.get(name);
        }
        if(force){
            var record = new GcodeSet(name);
            this.GcodeSets.set(record.Name,record);
            return record;
        }
        return null;
    }
    Recordings = new Map<string,GcodeSet>();
    GcodeSetAction(action:EmGcodeSetAction,name:string,newname:string){
        switch (action) {
            case EmGcodeSetAction.Record:
                if(newname) name = newname; 
                var rec = this.GetGcodeSet(name,true);
                if(rec){
                    if(!this.Recordings.has(name)) 
                        this.Recordings.set(rec.Name,rec);
                }
                break;
            case EmGcodeSetAction.StopRecord:
                if(newname) name=newname;
                if(this.Recordings.has(name)) 
                    this.Recordings.delete(name);
                break;
            case EmGcodeSetAction.Go:
                if(newname) name=newname;
                var rec = this.GetGcodeSet(name,true);
                for(let cmd of rec.Gcodes){
                    this.PushG(new GCommand(cmd));
                }
                break;   
            case EmGcodeSetAction.Push:   
                newname=newname.trim();             
                if(newname || newname=='') return;
                var rec = this.GetGcodeSet(name,true);
                if(newname.indexOf("\r\n")>0){
                    for(let g of newname.split('\r\n')){
                        rec.Gcodes.push(g);
                    }
                }
                else{
                    rec.Gcodes.push(newname);
                }
                break;
            case EmGcodeSetAction.Clear:
                if(newname) name = newname;
                var rec = this.GetGcodeSet(name,true);
                rec.Clear();
                break;
            case EmGcodeSetAction.Delete:
                if(newname) name=newname;
                if(this.DefaultGcommandSet.Name==name) break;
                if(this.Recordings.has(name)) 
                    this.Recordings.delete(name);
                if(this.GcodeSets.has(name))
                    this.GcodeSets.delete(name);
                break; 
            case EmGcodeSetAction.DeleteAll:
                this.Recordings.clear;
                this.GcodeSets.clear;
                this.DefaultGcommandSet.Clear;
                this.GcodeSets.set(this.DefaultGcommandSet.Name,this.DefaultGcommandSet);
            case EmGcodeSetAction.Import:
                var gf = new GFileCommand();
                var rec = this.GetGcodeSet(name,true);
                if(!rec) return;
                if(gf.ReadSyncFromFile(newname)){
                    //console.info("Importing",rec.Name)
                    for(let g of gf.Gcodes){   
                        if(g.startsWith("##")){
                            rec = this.GetGcodeSet(name+"-"+g.substring(2),true)
                        }
                        rec.Gcodes.push(g)
                    }
                };
                break;
            case EmGcodeSetAction.Export:
                var rec = this.GetGcodeSet(name,true);
                if(rec) rec.Export(newname);
                break;
            case EmGcodeSetAction.ExportAll:
                var gcodes = Array<string>();
                for(let rec of this.GcodeSets.values()){
                    gcodes.push("##"+rec.Name)
                    for(let command of rec.Gcodes){
                        gcodes.push(command)
                    }
                }
                fs.writeFile(newname, gcodes.join("\r\n"),  function(err:any) {
                    if (err) {
                        AlertError("Export To "+newname+" failed.");
                    }
                });
                break;
            default:
                break;
        } 
    }

    Menu_GcodeSets(){
        var menu = [{text:'No Collections',value:""}];
        if(this.GcodeSets.size>0) menu.length=0;
        this.GcodeSets.forEach((v,k)=>{
            menu.push({text:k,value:k});
        })
        return menu;
    }

//#endregion

    PushGcode(command:string){
        command=command.trim();
        if(this.Status.State==EmState.Sleep && command != EmCommand.ResetGRBL){
            AlertError("Machine is sleeping. disconnect first and then connect again!",0);
            return;
        }
        if(this.Status.State==EmState.Hold && command !=EmCommand.Resume){
            AlertError("Machine is 'paused'. send system command '>~ Resume' to free hold first!",0);
            return;
        }

        if(!ImCommand.Has(command as EmCommand)){
            var gcmd= new GCommand(command);gcmd.Result = '';
            this.PushG(gcmd);
            return;
        }
        else{             
            var cmd = new Command(command);cmd.Result = ''; 
            switch (command.toUpperCase()) {
                case EmCommand.Sleep:                    
                    cmd.EchoType = EmEcho.Nothing;
                    this.Status.State= EmState.Sleep;
                    this.Push(cmd);
                    return;
                case EmCommand.Pause:
                    cmd.EchoType = EmEcho.WaitSomeTime;                
                    this.Status.State= EmState.Hold;
                    this.Push(cmd);  
                    return;     
                case EmCommand.Resume:
                    cmd.EchoType = EmEcho.WaitSomeTime; 
                    this.Status.State= EmState.Run;
                    this.Push(cmd); 
                    return;
                case EmCommand.ResetGRBL:
                    cmd.EchoType = EmEcho.Nothing;
                    this.Status.State= EmState.Connected;
                    this.Push(cmd);
                    return; 
                default:
                    cmd.OnEchoed = function(){ this.Result = cmd.Echoes.join("\n");}
                    this.Push(cmd);
                    return 
            }
        }
    }
    ReportGcode(command:string){
        command=command.trim();
        if(this.Status.State==EmState.Sleep){
            return AlertError("Machine is sleeping. disconnect first and then connect again!",0);
        }
        if(this.Status.State==EmState.Hold && command != '~'){
            return AlertError("Machine is holding. send ~ to free hold first!",0);
        }        
        if(!ImCommand.Has(command as EmCommand)){
            var gcmd= new GCommand(command);gcmd.Result = 0;
            return this.ReporterG(gcmd).then(ret => (ret));
        }
        else{
            var cmd:Command = new Command(command);cmd.Result = 0; 
            switch (command.toUpperCase()) {
                case EmCommand.Sleep:                    
                    cmd.EchoType = EmEcho.Nothing;
                    this.Status.State= EmState.Sleep;
                    return this.Reporter(cmd);
                case EmCommand.Pause:
                    cmd.EchoType = EmEcho.Nothing;                   
                    this.Status.State= EmState.Hold;
                    return this.Reporter(cmd);    
                case EmCommand.Resume:
                    cmd.EchoType = EmEcho.WaitSomeTime;                   
                    this.Status.State= EmState.Run;
                    return this.Reporter(cmd);
                case EmCommand.ResetGRBL:
                    cmd.EchoType = EmEcho.Nothing;
                    this.Status.State= EmState.Connected;
                    return this.Reporter(cmd);                
                default:
                    cmd.OnEchoed = function(){ this.Result = cmd.Echoes.join("\n");}
                    return this.Reporter(cmd).then(ret => (ret));
            }
        }

    }
    Push_GPointArgs(args:IGPointArgs){
        var gcmd = new GCommand()
        gcmd.GPoint.ParseArgs(args);
        if( gcmd.GPoint.Error){
            AlertError("Feed can not be null");
            return;
        }
        this.PushG(gcmd);
    }
    ReportAxisValue(AxiesName:string){
        if(this.Last!=null){
            if(this.Last.Text=='?' && this.Last.Echoed && this.Status.IsIdle){
                return this.Status.AxisValue(AxiesName)  
            }
        }
        var cmd = new Command("?");
        cmd.Machine = this;       
        cmd.OnMessaged = function(line:string){
            if(line.startsWith("<")){
                this.Machine.Status.Parse(line);
                this.Result = this.Machine.Status.AxisValue(AxiesName)                
            }
        }
        return this.Reporter(cmd).then(ret => (ret));
    }
    ReportIdle(){
        if(this.Last!=null){
            if(this.Last.Text=='?' && this.Last.Echoed && this.Status.IsIdle){
                return true;  
            }
        }
        var cmd = new Command("?");
        cmd.Machine = this;       
        cmd.OnMessaged = function(line:string){
            if(line.startsWith("<")){
                this.Machine.Status.Parse(line);
                this.Result = this.Machine.Status.IsIdle                
            }
        }
        return this.Reporter(cmd).then(ret => (ret));
    }
}

class ScratchGRBL{ 
    //#region Normal
    EXTENSION_ID= "ScratchGRBL"; name = "Scratch GRBL"
    comm: any;    runtime: any
    decoder = new TextDecoder;   encoder = new TextEncoder;  lineBuffer=''
    Machine = new Machine()
    fs:any;
    constructor(runtime: any){
        this.runtime = runtime; 
        this.comm = new runtime.ioDevices.comm(this.EXTENSION_ID); 
        this.fs=runtime.ioDevices.fs;
        this.runtime.registerPeripheralExtension(this.EXTENSION_ID, this); 
        this.onmessage = this.onmessage.bind(this); 
        this.write = this.write.bind(this); 
        this.Machine.Com_Write = this.write.bind(this);
        this.Machine.GRBL=this;
        this.stopAll = this.stopAll.bind(this);
        this.runtime.on("PROJECT_STOP_ALL", this.stopAll);
        RunTime = this.runtime;


        //@ts-ignore
        EmCommand["CancelJOG"] =  String.fromCharCode(0X85);
        //@ts-ignore
        EmCommand["ResetGRBL"] = String.fromCharCode(0x84);
        ImCommand.CreateValueMap();
        //@ts-ignore
        //this.vm = vm;
    }
    write(data:any){        
        //console.info("----",data);
        this.comm.write(data+"\r")//\n
    }
    onmessage(t:any){
        var e = this.decoder.decode(t);
        if (this.lineBuffer += e, -1 !== this.lineBuffer.indexOf("\r\n")) {
            var lines = this.lineBuffer.split("\r\n");
            this.lineBuffer = lines.pop() as string;
            for (const l of lines){
                //console.info("->",l.trim())
                this.Machine.Com_Read(l.trim());
            }
        }
    }
    getDeviceList() {
        return this.comm.getDeviceList()
    }
    scan(){
        this.comm.getDeviceList().then((result: any) => {
            this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
        });
    }
    connect(id:any){
        var e = this;
        this.comm.connect(id).then(function (t:any) {
            e.comm.onmessage = e.onmessage,
            e.runtime.emit(e.runtime.constructor.PERIPHERAL_CONNECTED)

            setTimeout(function () {  
                e.Machine.Connect();
            }, 2e3)

        }).catch(function (t:any) {
            Log.warn("connect GRBL peripheral fail", t)
        })
    }
    disconnect(){
        this.comm.disconnect()
        this.Machine.Disconnect()
    }
    isConnected(){
        return this.comm.isConnected()
    }
    stopAll(arg0: string, stopAll: any) {
        //
    }
    sleep(t:any){
        return new Promise(function (e) {
            return setTimeout(e, t)
        })
    }
    //#endregion
    get Runable():boolean{
        if(!this.isConnected()){
            return AlertInfo("Connect device first!",false);
        
        }
        if(this.Machine.Status.State>EmState.Run){
            return AlertInfo('Machine is '+this.Machine.Status.Name+' reset device and connect again!',false);
        }
        return true;
    }
    Get_Axies(args:any){
        if(!this.Runable) return null;
        return this.Machine.ReportAxisValue(args.AxiesName);
    }
    Get_Idle(){
        if(!this.Runable) return null;
        return this.Machine.ReportIdle();
    }
    Goto_XYZ(args:any){
        if(!this.Runable) return;
        this.Machine.Push_GPointArgs(args);
    }
    Goto_XYZ_Gcode(args:any){
        var gcmd = new GCommand()
        gcmd.GPoint.ParseArgs(args);
        if( gcmd.GPoint.Error){
            return AlertError(gcmd.GPoint.Error,0);
        }
        return gcmd.ToCom;      
    }
    Set_Setting(args:any){     
        if(!this.isConnected()){
            AlertInfo("Connect device first!");        
            return
        }
        //get or  set machine setting
        if(!args.SettingValue) {
            return
        }
        else{
            if(this.Machine.Settings.has(args.SettingID)){
                var setting = this.Machine.Settings.get(args.SettingID);
                setting.Value = args.SettingValue;
                this.Machine.Push(setting.Command);
                return //setting.Value ;
            }
        }  
        //set other setting
        if(args.SettingID == -3){
            var cmd = new Command("$N0="+args.SettingValue);
            this.Machine.Push(cmd);
            this.Machine.N0 = args.SettingValue;
            return //this.Machine.N0;
        }
        else if(args.SettingID == -4){            
            var cmd = new Command("$N1="+args.SettingValue);
            this.Machine.N1 = args.SettingValue;
            this.Machine.Push(cmd);
            return //this.Machine.N1;
        }
        else if(args.SettingID == -5){
            // $I for information
            if(args.SettingValue != ''){
                this.Machine.Push_For_Set_Information(args.SettingValue);
            }
             return //this.Machine.Infomation;
        }
        return //this.Machine.Version;
    }
    Send_Command(args:any){
        if(!this.isConnected()){
            AlertInfo("Connect device first!");   
            return;
        }
        if(!args.CommandSel){
            return;
        }
        this.Machine.PushGcode(args.CommandSel);
        return ;//this.Machine.ReportGcode(args.CommandSel);        
    }
    Send_Gcode(args:any){
        if(!this.isConnected()){
            AlertInfo("Connect device first!",0);
            return;        
        }
        var gcode = args.Gcode;
        if(!gcode||gcode==0){            
            return;//
        } 
        if(gcode.indexOf("\r\n")>-1){
            for(let g of gcode.split('\r\n')){
                this.Machine.PushG(new GCommand(g));
            }
        }
        else{
            this.Machine.PushGcode(gcode);
        }       
        return;
    }
    Help_Command(args:any){
        if(!args.CommandSel) return
        switch (args.CommandSel) {
            case EmHelpCommand.Help:
                this.fs.openSite("https://www.scratchGRBL.com","_blank");
                break;
            case EmHelpCommand.ConsoleOn:
                consoleOn=true;
                break;
            case EmHelpCommand.ConsoleOff:
                consoleOn=false;
                break;
            case EmHelpCommand.Clearqueque:
                this.Machine.ClearCommands();
                break;
            default:
                break;
        }
        return;
    }
    Wait_Gcode(args:any){
        if(!this.isConnected()){
            AlertInfo("Connect device first!",0);
            return;        
        }
        var gcode = args.Gcode;
        if(!gcode||gcode==0){            
            return this.Machine.ReportWaitCommandForG();
        } 

        if(gcode.indexOf("\r\n")>-1){
            for(let g of gcode.split('\r\n')){
                this.Machine.PushG(new GCommand(g));
            }
        }
        else{
            this.Machine.PushGcode(gcode);
        } 
        return this.Machine.ReportWaitCommandForG();
    }
    For_GcodeSet(args:any){
        this.Machine.GcodeSetAction(args.Action,args.Name,args.NewName)    }
    Get_GcodeSet(args:any){
        if(args.name){
            var record =  this.Machine.GetGcodeSet(args.name,false);
            if(record){
                return record.ToText;
            }
        } 
        return '';
    }
    Note(){
        return;
    }
    //#region  menus
    Menu_Setting(){return this.Machine.Menu_Setting();}
    Menu_Axies(){return ImEnumAxis.Menu;}
    Menu_GTypes(){return ImEnumG.Menu;}
    Menu_GTypesNonable(){return ImEnumG.NonableMenu;}
    Menu_GcodeSets(){
        return this.Machine.Menu_GcodeSets();
    }
    Menu_GcodeSet_Action(){
        return ImGcodeSetAction.Menu;
    }
    Menu_LocaType(){
        return ImLoca.Menu;
    }
    Menu_EnumHelpCommand(){
        return ImHelpCommand.Menu;
    }
    //#endregion
    getInfo(){
        return {
            id: "ScratchGRBL",
            name: "Scratch GRBL",
            color1: '#0FBD8C',//'#5116ff',
            color2: '#0DA57A',//'#2c00af',
            menuIconURI: menuIcon,//blockIconURI: blockIcon,
            //blockIconURI: blockIcon,
            showStatusButton: true,
            blocks: [
                {opcode: 'Help_Command',
                blockType: BlockType.COMMAND,
                arguments: {
                    CommandSel:{
                        type:ArgumentType.STRING,
                        menu:"Menu_EnumHelpCommand",
                        defaultValue:'Help'
                    },
                },
                text: '[CommandSel]'},  

                {opcode: 'Goto_XYZ',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        GType: {
                            type: ArgumentType.STRING,
                            menu: "Menu_GType",
                            defaultValue: EmG.G0
                        },
                        Feed:{
                            type: ArgumentType.NUMBER
                        },
                        Pos0: {
                            type: ArgumentType.NUMBER,
                            //defaultValue: 0
                        },
                        Pos1: {
                            type: ArgumentType.NUMBER,
                            //defaultValue: 0
                        },
                        Pos2: {
                            type: ArgumentType.NUMBER,
                            //defaultValue: 0
                        },
                        Pos3: {
                            type: ArgumentType.NUMBER,
                            //defaultValue: 0
                        },
                        Pos4: {
                            type: ArgumentType.NUMBER,
                            //defaultValue: 0
                        },
                        LocateType: {
                        type: ArgumentType.STRING,
                        menu: "Menu_LocateType",
                        defaultValue: EmLoca.Default
                        }
                    },
                text: 'Run[GType][Pos0][Pos1][Pos2][Pos3][Pos4][LocateType]Feed[Feed]'},
                
                {opcode: 'Goto_XYZ_Gcode',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        GType: {
                            type: ArgumentType.STRING,
                            menu: "Menu_GTypeNonable",
                            defaultValue:EmG.G0
                        },  
                        Feed:{
                            type: ArgumentType.NUMBER
                        },          
                        Pos0: {
                            type: ArgumentType.NUMBER,
                            //defaultValue: 0
                        },
                        Pos1: {
                            type: ArgumentType.NUMBER,
                            //defaultValue: 0
                        },
                        Pos2: {
                            type: ArgumentType.NUMBER,
                            //defaultValue: 0
                        },
                        Pos3: {
                            type: ArgumentType.NUMBER,
                            //defaultValue: 0
                        },
                        Pos4: {
                            type: ArgumentType.NUMBER,
                            //defaultValue: 0
                        },
                        LocateType: {
                            type: ArgumentType.STRING,
                            menu: "Menu_LocateType",
                            defaultValue:  EmLoca.Default
                        },
                    },
                text: '[GType][Pos0][Pos1][Pos2][Pos3][Pos4][LocateType]Feed[Feed]'},

                {opcode: 'Wait_Gcode',
                blockType: BlockType.REPORTER,
                arguments: {
                    Gcode: {
                        type: ArgumentType.STRING,
                        defaultValue: ""
                    }
                },
                text: 'Wait[Gcode]'},

                {opcode: 'Send_Gcode',
                blockType: BlockType.COMMAND,
                arguments: {
                    Gcode: {
                        type: ArgumentType.STRING,
                        defaultValue: ""
                    } 
                },
                text: 'Run[Gcode]'},

                {opcode: 'Get_Axies',
                    blockType: BlockType.REPORTER,
                    arguments:{
                        AxiesName:{
                            type:ArgumentType.STRING,
                            menu:"Menu_Axies",
                            defaultValue: 'X'
                        } 
                    },
                text: '[AxiesName]'},

                {opcode: 'Get_Idle',
                    blockType: BlockType.BOOLEAN,
                text: 'IDLE'},

                {opcode: 'Set_Setting',
                blockType: BlockType.COMMAND,
                arguments:{
                    SettingID:{
                        type:ArgumentType.STRING,
                        menu:"Menu_Setting",
                        defaultValue: '-1'
                    },
                    SettingValue:{
                        type:ArgumentType.STRING,
                        defaultValMenu_Settingue: -1
                    } ,

                },
                text: '[SettingID][SettingValue]' },

                {opcode: 'Send_Command',
                blockType: BlockType.COMMAND,
                arguments: {
                    CommandSel:{
                        type:ArgumentType.STRING,
                        menu:"Menu_SystemCommand",
                        defaultValue: EmCommand.Pause
                    }
                },
                text: '[CommandSel]'},

                {opcode: 'For_GcodeSet',
                 blockType: BlockType.COMMAND,
                 arguments: {
                     NewName:{
                         type: ArgumentType.STRING,
                         defaultValue:''
                     },
                     Action: {
                        type: ArgumentType.STRING,
                        menu: "Menu_GcodeSet_Actions",
                        defaultValue: EmGcodeSetAction.Clear
                     },
                     Name: {
                        type: ArgumentType.STRING,
                        menu: "Menu_GcodeSet_Names",
                        acceptReporters: false,
                        defaultValue: this.Machine.DefaultGcommandSet.Name
                        
                     },
                     Path: {
                        type: ArgumentType.STRING,
                     }
                 },
                 text: '[Name][Action][NewName]'},

                {opcode: 'Get_GcodeSet',
                blockType: BlockType.REPORTER,
                arguments: {
                NewName:{
                    type: ArgumentType.STRING,
                    //defaultValue: this.Machine.DefaultGcommandSet.Name
                },
                    Name: {
                    type: ArgumentType.STRING,
                    menu: "Menu_GcodeSet_Names",
                    defaultValue: this.Machine.DefaultGcommandSet.Name
                    }
                },
                text: '[Name]'},
            ],
            menus: {
                Menu_Setting: 'Menu_Setting',
                Menu_GType:'Menu_GTypes',
                Menu_GTypeNonable:'Menu_GTypesNonable',
                Menu_LocateType: 'Menu_LocaType',
                Menu_GcodeSet_Names:'Menu_GcodeSets',
                Menu_GcodeSet_Actions: 'Menu_GcodeSet_Action',
                Menu_Axies: "Menu_Axies",
                Menu_EnumHelpCommand:'Menu_EnumHelpCommand',
                Menu_SystemCommand:[
                    {text: '>! : Pause', value:  EmCommand.Pause },
                    {text: '>~ : Start', value:  EmCommand.Resume},                                 
                    {text: '>Jog Cancel', value:  String.fromCharCode(0X85)},
                    {text: '>Go Home', value: 'G28'},// ImEnumAxis.GoHomeGode },    
                    {text: '>? : Postion', value: EmCommand.Postion},
                    {text: '>$ : Help', value:EmCommand.Help },
                    {text: '>$$ : View Parameters', value: EmCommand.ViewParameters }, 
                    {text: '>$H : Homing Cycle', value: EmCommand.GoHoming },
                    {text: '>$X : Kill Alarm Lock', value: EmCommand.KillAlarm },
                    {text: '>$N : Start Blocks', value: EmCommand.StartBlocks},
                    {text: '>$C : GCode Mode', value: EmCommand.GCodeMode},
                    {text: '>$G : Parser State', value: EmCommand.ParserState}, 
                    {text: '>$SLP : Sleep,reconnect needed', value: EmCommand.Sleep },
                    {text: '>Ctrl-x : Reset GRBL,reconnect needed', value:  String.fromCharCode(0x18) },
                    {text: '>Set Coordinates Zero To Origin', value: 'G10 P0 L20 X0 Y0 Z0 A0 B0' },
                    {text: '>Set Coordinates as zero', value: 'G10 P0 L20' },
                ]
            }
        }
    }
}

//@ts-ignore
module.exports = ScratchGRBL;