"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ArgumentType = Scratch.ArgumentType;
var BlockType = Scratch.BlockType;
var formatMessage = Scratch.formatMessage;
var Log = Scratch.log;
var React = Scratch.React;
const fs_1 = __importDefault(require("fs"));
var RunTime = null;
var consoleOn = false;
function AlertError(text, returnValue = null) {
    RunTime.emit("showAlert", {
        type: "error",
        msg: text
    });
    return returnValue;
}
function AlertInfo(text, returnValue = null) {
    RunTime.emit("showAlert", {
        type: "error",
        msg: text
    });
    return returnValue;
}
const menuIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGxSURBVDhPpZTLTgIxFIY7gMYL6oYFvoJbFoSwIcwEQphhNzyAa3duTXgCn8BHIK6MxoSJe5Y+hbqTeAGjQ+3ftOV0oF7CnzT9Z9p+Pac3ptVoNArKWj6O47yykKeKVk7V1hjW6VT3lWX1en1PWXTaUhbCYAowbcIXlbXJFFyr1baVFVGyPIr6tNromDg+2lTWDROyInPBgiA4UNadpopqJazXW4yxYDTlbGQ0TTkR5xKOyKIo6sNTmJXyr2kCdv/CC+MnLmAp/lNYNkorzewGhGE41zDUKE5Y5pwtRybUarV2wyg0sML4kcsOQtmUzSFFVMMhQ8c5vgErlUrvnueV0/TzfGeneDydzT5uzy7YV7UsxwGWJMkk66GlDeCDQS4d+dMIkQl1u93ndrt9KNMXcqYshNmsNAHjic/fbnyOWmyCc82or1QqG6hN2nrN0lHzRMNQJlf+DFC0uWD0kEtpGIRGfhf0AXu99lduwI8wemxwA3Q0D5fNU/lT6I8wuQ9m/WijC0A9vX40Q6n/wmj/JZhI2bxna8I8wMzjsCYMS7d4zelL4fL6nCnRKwuQKIx9A7vBwl6UCsXuAAAAAElFTkSuQmCC";
const blockIcon = menuIcon;
function getEnum(myenum, enumValue) {
    return myenum[enumValue];
}
var EmEcho;
(function (EmEcho) {
    EmEcho[EmEcho["Nothing"] = 0] = "Nothing";
    EmEcho[EmEcho["ok"] = 1] = "ok";
    EmEcho[EmEcho["error"] = 2] = "error";
    EmEcho[EmEcho["WaitSomeTime"] = 3] = "WaitSomeTime";
})(EmEcho || (EmEcho = {}));
var EmG;
(function (EmG) {
    EmG["G0"] = "G0";
    EmG["G1"] = "G1";
    EmG["$J="] = "$J=";
})(EmG || (EmG = {}));
var EmLoca;
(function (EmLoca) {
    EmLoca["Default"] = "Default";
    EmLoca["G90"] = "G90";
    EmLoca["G91"] = "G91";
})(EmLoca || (EmLoca = {}));
var EmAxis;
(function (EmAxis) {
    EmAxis[EmAxis["X"] = 0] = "X";
    EmAxis[EmAxis["Y"] = 1] = "Y";
    EmAxis[EmAxis["Z"] = 2] = "Z";
    EmAxis[EmAxis["A"] = 3] = "A";
    EmAxis[EmAxis["B"] = 4] = "B";
})(EmAxis || (EmAxis = {}));
var EmCommandType;
(function (EmCommandType) {
    EmCommandType[EmCommandType["System"] = 0] = "System";
    EmCommandType[EmCommandType["GCommand"] = 1] = "GCommand";
    EmCommandType[EmCommandType["GFileCommand"] = 2] = "GFileCommand";
})(EmCommandType || (EmCommandType = {}));
var EmState;
(function (EmState) {
    EmState[EmState["DisConnected"] = 0] = "DisConnected";
    EmState[EmState["Connected"] = 1] = "Connected";
    EmState[EmState["Idle"] = 2] = "Idle";
    EmState[EmState["Jog"] = 3] = "Jog";
    EmState[EmState["Home"] = 4] = "Home";
    EmState[EmState["Run"] = 5] = "Run";
    EmState[EmState["Hold"] = 6] = "Hold";
    EmState[EmState["Alarm"] = 7] = "Alarm";
    EmState[EmState["Check"] = 8] = "Check";
    EmState[EmState["Door"] = 9] = "Door";
    EmState[EmState["Sleep"] = 10] = "Sleep";
})(EmState || (EmState = {}));
var EmHelpCommand;
(function (EmHelpCommand) {
    EmHelpCommand["Help"] = "Help";
    EmHelpCommand["Clearqueque"] = "Clearqueque";
    EmHelpCommand["ConsoleOn"] = "ConsoleOn";
    EmHelpCommand["ConsoleOff"] = "ConsoleOff";
})(EmHelpCommand || (EmHelpCommand = {}));
var EmGcodeSetAction;
(function (EmGcodeSetAction) {
    EmGcodeSetAction["Record"] = "Record";
    EmGcodeSetAction["StopRecord"] = "StopRecord";
    EmGcodeSetAction["Push"] = "Push";
    EmGcodeSetAction["Go"] = "Go";
    EmGcodeSetAction["Import"] = "Import";
    EmGcodeSetAction["Export"] = "Export";
    EmGcodeSetAction["ExportAll"] = "ExportAll";
    EmGcodeSetAction["Clear"] = "Clear";
    EmGcodeSetAction["Delete"] = "Delete";
    EmGcodeSetAction["DeleteAll"] = "DeleteAll";
})(EmGcodeSetAction || (EmGcodeSetAction = {}));
var EmCommand;
(function (EmCommand) {
    EmCommand["Pause"] = "!";
    EmCommand["Resume"] = "~";
    EmCommand["Sleep"] = "$SLP";
    EmCommand["CancelJOG"] = "0X85";
    EmCommand["ResetGRBL"] = "0x18";
    EmCommand["SafetyDoor"] = "0x84";
    EmCommand["Postion"] = "?";
    EmCommand["Help"] = "$";
    EmCommand["ViewParameters"] = "$$";
    EmCommand["ToggleSpindleStop"] = "0x9E";
    EmCommand["ToggleFloodCoolant"] = "0xA0";
    EmCommand["GoHoming"] = "$H";
    EmCommand["KillAlarm"] = "$X";
    EmCommand["StartBlocks"] = "$N";
    EmCommand["GCodeMode"] = "$C";
    EmCommand["ParserState"] = "$G";
})(EmCommand || (EmCommand = {}));
class Menur {
    static Create(Im, myenum) {
        Im.FormatMsg();
        var menus = [];
        for (let k of Object.keys(myenum)) {
            if (Im.MenuMap.has(k)) {
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
class ImGcodeSetAction {
    static FormatMsg() {
        if (this.MenuMap.size == 0) {
            this.MenuMap.set(EmGcodeSetAction.StopRecord, "Stop record");
            this.MenuMap.set(EmGcodeSetAction.Import, "Import file");
            this.MenuMap.set(EmGcodeSetAction.DeleteAll, "Delete all");
            this.MenuMap.set(EmGcodeSetAction.ExportAll, "Export all");
            this.MenuMap.set(EmGcodeSetAction.Export, "Export to file");
        }
    }
}
ImGcodeSetAction.MenuMap = new Map();
ImGcodeSetAction.Menu = Menur.Create(ImGcodeSetAction, EmGcodeSetAction);
class ImLoca {
    static FormatMsg() {
        if (this.MenuMap.size == 0) {
            this.MenuMap.set(EmLoca.Default, "");
            this.MenuMap.set(EmLoca.G90, "Absolute");
            this.MenuMap.set(EmLoca.G91, "Offset");
        }
    }
}
ImLoca.MenuMap = new Map();
ImLoca.Menu = Menur.Create(ImLoca, EmLoca);
class ImHelpCommand {
    static FormatMsg() {
        if (this.MenuMap.size == 0) {
            this.MenuMap.set(EmHelpCommand.Clearqueque, "Clear queque");
            this.MenuMap.set(EmHelpCommand.ConsoleOff, "Console Off");
            this.MenuMap.set(EmHelpCommand.ConsoleOn, "Console on");
        }
    }
}
ImHelpCommand.MenuMap = new Map();
ImHelpCommand.Menu = Menur.Create(ImHelpCommand, EmHelpCommand);
class ImCommand {
    static CreateValueMap() {
        for (let k of Object.keys(EmCommand)) {
            this.ValueMap.set(EmCommand[k], k);
        }
    }
    static Has(emCommand) {
        return this.ValueMap.has(emCommand);
    }
}
ImCommand.ValueMap = new Map();
class ImEnumG {
    static CreateMenu(nonable = false) {
        var menus = [];
        for (let k of this.Keys) {
            menus.push({
                text: k, value: k
            });
        }
        if (nonable) {
            menus.push({
                text: '', value: ''
            });
        }
        return menus;
    }
}
ImEnumG.Keys = Object.keys(EmG);
ImEnumG.Count = Object.keys(EmG).length;
ImEnumG.Menu = ImEnumG.CreateMenu();
ImEnumG.NonableMenu = ImEnumG.CreateMenu(true);
class Axis {
    constructor(axis = EmAxis.X, value = 0) {
        this.Axis = EmAxis.X;
        this.Value = 0;
        this.Axis = axis;
        this.Value = value;
    }
    get AxiesName() {
        return ImEnumAxis.Names[this.Axis];
    }
    set AxiesName(name) {
        this.Axis = ImEnumAxis.Axis(name);
    }
    get Gcode() {
        if (this.Value != null) {
            return ImEnumAxis.Name(this.Axis) + this.Value.toString();
        }
        return '';
    }
    get Copy() {
        return new Axis(this.Axis, this.Value);
    }
}
class ImEnumAxis {
    static Name(axies) {
        if (axies > -1 && axies < this.Axises.length) {
            return ImEnumAxis.Names[axies];
        }
        return null;
    }
    static Axis(name) {
        return EmAxis[name];
    }
    static CreateMenu() {
        var menus = [];
        for (var i = 0; i < this.Count; i++) {
            menus.push({
                text: this.Names[i], value: this.Names[i]
            });
        }
        return menus;
    }
}
ImEnumAxis.Count = Object.keys(EmAxis).length / 2;
ImEnumAxis.Names = Object.keys(EmAxis).map((k) => EmAxis[k]).filter((v) => typeof v === 'string');
ImEnumAxis.Axises = Object.keys(EmAxis).map((k) => EmAxis[k]).filter((v) => typeof v === 'number').map(Number);
ImEnumAxis.Menu = ImEnumAxis.CreateMenu();
class GPoint {
    constructor(axisized = false) {
        this.Axises = new Array();
        this.G = EmG.G0;
        this.LocateType = EmLoca.G90;
        this.Others = null;
        this.Feed = null;
        this.Error = null;
        this.gcode = null;
        if (axisized)
            this.Axisize();
    }
    get IsError() {
        return this.Error != null;
    }
    Axis(enAxis, force = true) {
        for (let v of this.Axises) {
            if (v.Axis == enAxis)
                return v;
        }
        if (!force)
            return null;
        var v = new Axis(enAxis);
        this.Axises.push(v);
        return v;
    }
    Axis_ByName(axiesName, force = true) {
        var axies = ImEnumAxis.Axis(axiesName);
        return this.Axis(axies, force);
    }
    Axisize() {
        this.Axises.length = 0;
        for (var i = 0; i < ImEnumAxis.Count; i++) {
            this.Axises.push(new Axis(i, 0));
        }
    }
    get Copy() {
        var copy = new GPoint;
        for (let v of this.Axises) {
            copy.Axises.push(v.Copy);
        }
        return copy;
    }
    set Gcode(gcode) {
        this.gcode = gcode;
    }
    get Gcode() {
        if (this.gcode != null)
            return this.gcode;
        var gode = '';
        for (let A of this.Axises)
            gode += ' ' + A.Gcode;
        if (this.Feed != null && this.Feed > 0)
            gode += ' F' + this.Feed.toString();
        if (this.G == EmG['$J='])
            gode = this.G + gode.substring(1);
        else
            gode = this.G + gode;
        if (this.LocateType != EmLoca.Default)
            return gode + ' ' + this.LocateType;
        return gode;
    }
    ParseArgs(args) {
        this.G = args.GType;
        this.LocateType = args.LocateType;
        this.Feed = args.Feed;
        if (this.G == EmG['$J='] || this.G == EmG.G1) {
            if (args.Feed == null) {
                this.Error = "$J= or G1 command need Feed";
            }
            else if (args.Feed < 1) {
                this.Error = "$J= or G1 command need Feed";
                ;
            }
        }
        for (var i = 0; i < ImEnumAxis.Count; i++) {
            var pos;
            eval("pos = args.Pos" + i.toString());
            if (pos != '')
                this.Axis(i).Value = parseFloat(pos);
        }
        this.gcode = this.Gcode;
        return this;
    }
}
class Command {
    constructor(text = null) {
        this.Text = null;
        this.Echoed = false;
        this.EchoType = EmEcho.ok;
        this.Echoes = new Array();
        this.TimeToEcho = 500;
        this.Reporter = null;
        this.Result = null;
        this.EstimatedTime = 0;
        if (text == null)
            return;
        this.Text = text;
        if (text.startsWith("!"))
            this.EchoType = EmEcho.Nothing;
        if (text.startsWith("$SLP"))
            this.EchoType = EmEcho.Nothing;
    }
    get ToCom() { return this.Text; }
    Info() { console.info("Command: ", this.Text, typeof this); }
    OnMessaged(line) { }
    Message(line) { this.Echoes.push(line); this.OnMessaged(line); }
    OnEchoed() { }
    EchoToConsole() {
        if (this.Result == null) {
            return this.Echoes.join(" > ");
        }
        else {
            return this.Result, this.Echoes.join(" > ");
        }
    }
    Echo(reportIt = true) {
        this.Echoed = true;
        this.OnEchoed();
        if (consoleOn)
            console.info(this.ToCom, " >> ", this.EchoToConsole());
        if (reportIt)
            this.Report();
    }
    Report() {
        if (this.Reporter != null) {
            this.Reporter(this.Result);
            this.Reporter = null;
        }
    }
}
class GFileCommand extends Command {
    constructor() {
        super(...arguments);
        this.Gcodes = new Array();
        this.PopIndex = 0;
        this.FileReaded = false;
    }
    get Type() { return EmCommandType.GFileCommand; }
    get HasMore() { return this.PopIndex < this.Gcodes.length; }
    Pop() { return new GCommand(this.Gcodes[this.PopIndex++]); }
    ReadSyncFromFile(filePath) {
        if (fs_1.default.existsSync(filePath)) {
            let contents = fs_1.default.readFileSync(filePath, 'utf8');
            this.PopIndex = 0;
            this.Gcodes = contents.split('\r\n');
            this.FileReaded = true;
            return true;
        }
        return false;
    }
}
class GCommand extends Command {
    constructor(gcode = null) {
        super(gcode);
        this.GPoint = new GPoint();
    }
    get Type() { return EmCommandType.GCommand; }
    get ToCom() {
        if (this.Text != null) {
            return this.Text;
        }
        else {
            return this.GPoint.Gcode;
        }
    }
}
class GWaitCommand extends GCommand {
    constructor() {
        super('?');
        this.Interval = 50;
        this.Idle = false;
    }
    OnMessaged(line) {
        if (line.startsWith("<")) {
            this.Machine.Status.Parse(line);
            if (this.Machine.Status.State == EmState.Idle || this.Machine.Status.State == EmState.Sleep) {
                this.Idle = true;
                this.Result = 0;
            }
        }
    }
    EchoToConsole() {
        if (this.Idle) {
            return "Idle";
        }
        else
            return "waiting";
    }
    Report() {
        if (this.Idle) {
            if (this.WaitFor) {
                this.Result = this.WaitFor.Result;
            }
            super.Report();
        }
    }
}
class GcodeSet {
    constructor(name) {
        this.Name = 'Default';
        this.Gcodes = new Array();
        this.Name = name;
    }
    Export(path) {
        if (path.toLowerCase().startsWith("c")) {
            AlertError("Can not export to C disk: " + path);
            return;
        }
        fs_1.default.writeFile(path, this.ToText, function (err) {
            if (err) {
                AlertError(err);
            }
        });
    }
    get ToText() {
        return this.Gcodes.join("\r\n");
    }
    Import(path) {
        let contents = fs_1.default.readFileSync(path, 'utf8');
        var Gcodes = contents.split('\r\n');
        for (let g in Gcodes) {
            this.Gcodes.push(g);
        }
    }
    Clear() {
        this.Gcodes.length = 0;
    }
}
class MachineSetting {
    constructor(id = '0', value = 10) {
        this.ID = '0';
        this.Value = 10;
        this.Name = "";
        this.Note = "";
        this.ID = id;
        this.Value = value;
    }
    get Command() { return new Command("$" + this.ID.toString() + "=" + this.Value.toString()); }
}
class MachineStatus {
    constructor() {
        this.Line = "";
        this.Position = new GPoint(true);
        this.WPosition = new GPoint(true);
        this.OVPosition = new GPoint(true);
        this.Feed0 = 0;
        this.Feed1 = 1;
        this.State = EmState.Idle;
    }
    get Name() { return getEnum(EmState, this.State); }
    get IsIdle() { return this.State == EmState.Idle; }
    Parse(line) {
        this.Line = line;
        var lns = line.substring(1, line.length - 2).split("|");
        var xyz = lns[1].substring(lns[1].indexOf(':') + 1).split(',');
        this.State = EmState[lns[0]];
        for (var i = 0; i < ImEnumAxis.Count; i++) {
            this.Position.Axises[i].Value = parseFloat(xyz[i]);
        }
        if (lns.length > 2) {
            var fs = lns[2].split(':')[1].split(',');
            this.Feed0 = parseInt(fs[0]);
            if (fs.length > 1)
                this.Feed1 = parseInt(fs[1]);
        }
        if (lns.length > 3) {
            var name_Poses = lns[3].split(':');
            var point = this.WPosition;
            if (name_Poses[0] == 'OV')
                point = this.OVPosition;
            var poses = name_Poses[1].split(',');
            for (var i = 0; i < poses.length; i++) {
                point.Axises[i].Value = parseFloat(poses[i]);
            }
        }
    }
    AxisValue(AxiesName) {
        var loc = this.Position.Axis_ByName(AxiesName, false);
        if (loc)
            return loc.Value;
        return 0;
    }
}
class Machine {
    constructor() {
        this.Version = '';
        this.MSG = '';
        this.N0 = '';
        this.N1 = '';
        this.Infomation = '';
        this.Settings = new Map();
        this.DefaultIdleCheckInterval = 100;
        this.FinalTarget = new GPoint(true);
        this.Status = new MachineStatus();
        this.Commands = new Array();
        this.GCommands = new Array();
        this.RunedCommandCount = 0;
        this.Last = null;
        this.current = null;
        this.CurrentGFileCommand = null;
        this.CurrentWaitCommand = null;
        this.DefaultGcommandSet = new GcodeSet("Gcodes");
        this.GcodeSets = new Map();
        this.Recordings = new Map();
        this.InitSettings();
        this.GcodeSets.set(this.DefaultGcommandSet.Name, this.DefaultGcommandSet);
    }
    get Connected() { return this.Status.State > EmState.DisConnected; }
    get Current() { return this.current; }
    set Current(cmd) {
        this.Last = this.current;
        this.current = cmd;
    }
    Com_Write(data) { }
    Com_Read(line) {
        if (this.RunedCommandCount == 0) {
            if (this.Version == '') {
                this.Version = line;
                if (consoleOn)
                    console.info(line);
                return;
            }
            if (line.startsWith('[MSG:')) {
                this.MSG = line;
                if (consoleOn)
                    console.info(line);
                return;
            }
            if (this.N0 == '')
                this.N0 = line.substring(1, line.length - 3);
            else
                this.N1 = line.substring(1, line.length - 3);
            if (consoleOn)
                console.info(line);
            return;
        }
        if (!this.Current) {
            if (consoleOn)
                console.info(line);
        }
        else {
            switch (this.Current.EchoType) {
                case EmEcho.ok:
                    if (line == "ok") {
                        this.Current.Echo();
                        this.TryPopWrite();
                        return;
                    }
                    else if (line.startsWith("error")) {
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
        }
    }
    InitSettings() {
        var e = this;
        var InitSetting = function (id, name) {
            var setting = new MachineSetting();
            setting.ID = id.toString();
            setting.Name = name;
            e.Settings.set(setting.ID, setting);
        };
        InitSetting(0, "Step pulse, microseconds");
        InitSetting(1, "Step idle delay, milliseconds");
        InitSetting(2, "Step port invert, mask");
        InitSetting(3, "Direction port invert, mask");
        InitSetting(4, "Step enable invert, boolean");
        InitSetting(5, "Limit pins invert, boolean");
        InitSetting(6, "Probe pin invert, boolean");
        InitSetting(10, "Status report, mask");
        InitSetting(11, "Junction deviation, mm");
        InitSetting(12, "Arc tolerance, mm");
        InitSetting(13, "Report inches, boolean");
        InitSetting(20, "Soft limits, boolean");
        InitSetting(21, "Hard limits, boolean");
        InitSetting(22, "Homing cycle, boolean");
        InitSetting(23, "Homing dir invert, mask");
        InitSetting(24, "Homing feed, mm/min");
        InitSetting(25, "Homing seek, mm/min");
        InitSetting(26, "Homing debounce, milliseconds");
        InitSetting(27, "Homing pull-off, mm");
        InitSetting(30, "Max spindle speed, RPM");
        InitSetting(31, "Min spindle speed, RPM");
        InitSetting(32, "Laser mode, boolean");
        InitSetting(100, "X steps/mm");
        InitSetting(101, "Y steps/mm");
        InitSetting(102, "Z steps/mm");
        InitSetting(103, "A steps/mm");
        InitSetting(104, "B steps/mm");
        InitSetting(110, "X Max rate, mm/min");
        InitSetting(111, "Y Max rate, mm/min");
        InitSetting(112, "Z Max rate, mm/min");
        InitSetting(113, "A Max rate, mm/min");
        InitSetting(114, "B Max rate, mm/min");
        InitSetting(120, "X Acceleration, mm/sec^2");
        InitSetting(121, "Y Acceleration, mm/sec^2");
        InitSetting(122, "Z Acceleration, mm/sec^2");
        InitSetting(123, "A Acceleration, mm/sec^2");
        InitSetting(124, "B Acceleration, mm/sec^2");
        InitSetting(130, "X Max travel, mm");
        InitSetting(131, "Y Max travel, mm");
        InitSetting(132, "Z Max travel, mm");
        InitSetting(133, "A Max travel, mm");
        InitSetting(134, "B Max travel, mm");
    }
    Menu_Setting() {
        var menus = [{ text: 'Settings', value: "-1" }, { text: this.Version, value: "-2" }];
        menus.push({ text: "$N0=" + this.N0, value: "-3" });
        menus.push({ text: "$N1=" + this.N1, value: "-4" });
        menus.push({ text: "$I=" + this.Infomation, value: "-5" });
        menus.push();
        for (let param of this.Settings.values()) {
            menus.push({
                text: "$" + param.ID.toString() + "=" + param.Value.toString() + " " + param.Name,
                value: param.ID
            });
        }
        return menus;
    }
    TryPop() {
        if (this.Commands.length > 0) {
            return this.Commands.shift();
        }
        if (this.CurrentWaitCommand) {
            if (this.CurrentWaitCommand.Echoed) {
                if (this.CurrentWaitCommand.Idle) {
                    this.CurrentWaitCommand = null;
                }
                else {
                    this.CurrentWaitCommand.Echoed = false;
                    var e = this;
                    var waitcommand = this.CurrentWaitCommand;
                    setTimeout(function () {
                        e.Push(waitcommand);
                    }, this.CurrentWaitCommand.Interval);
                    return;
                }
            }
            else {
                return;
            }
        }
        if (this.CurrentGFileCommand) {
            if (this.CurrentGFileCommand.HasMore) {
                var gfcmd = this.CurrentGFileCommand.Pop();
                return gfcmd;
            }
            else {
                this.CurrentGFileCommand = null;
            }
        }
        if (this.GCommands.length > 0) {
            var cmd = this.GCommands.shift();
            if (cmd instanceof GWaitCommand) {
                this.CurrentWaitCommand = cmd;
                return cmd;
            }
            else if (cmd instanceof GFileCommand) {
                this.CurrentGFileCommand = cmd;
                return this.TryPop();
            }
            else {
                return cmd;
            }
        }
        return null;
    }
    TryPopWrite() {
        if (this.Current == null) {
            var cmd = this.TryPop();
            if (cmd != null) {
                this.RunedCommandCount++;
                this.Current = cmd;
                this.Com_Write(this.Current.ToCom);
                switch (this.Current.EchoType) {
                    case EmEcho.Nothing:
                        this.Current.Echo();
                        this.Current = null;
                        this.TryPopWrite();
                        break;
                    case EmEcho.WaitSomeTime:
                        var e = this;
                        setTimeout(function () {
                            e.Current.Echo();
                            e.Current = null;
                            e.TryPopWrite();
                        }, e.Current.TimeToEcho);
                        break;
                    default:
                        break;
                }
            }
        }
        else if (this.Current.Echoed) {
            this.Current = null;
            this.TryPopWrite();
        }
    }
    Connect() {
        if (this.Version.indexOf("Grbl 1.1") < 0) {
            this.Status.State = EmState.DisConnected;
            return;
        }
        else {
            this.Status.State = EmState.Connected;
        }
        this.Push_For_Information();
        if (this.MSG.indexOf("to unlock") > 0) {
            this.Push(new Command("$X"));
            this.MSG = '';
        }
        this.Push_For_Settings();
    }
    Disconnect() {
        this.Version = '';
        this.MSG = '';
        this.Infomation = '';
        this.N0 = '';
        this.N1 = '';
        this.Status.State = EmState.DisConnected;
        this.ClearCommands();
    }
    ClearCommands() {
        this.Commands.length = 0;
        this.GCommands.length = 0;
        this.CurrentGFileCommand = null;
        this.CurrentWaitCommand = null;
        if (this.current) {
            this.current.Echo();
            this.current = null;
        }
        this.RunedCommandCount = 0;
    }
    Push(cmd) {
        this.Commands.push(cmd);
        this.TryPopWrite();
    }
    PushG(gcmd) {
        this.GCommands.push(gcmd);
        this.Recordings.forEach((value, key) => {
            value.Gcodes.push(gcmd.ToCom);
        });
        this.TryPopWrite();
    }
    PushFileG(gcmd) {
        this.GCommands.push(gcmd);
        this.TryPopWrite();
    }
    GetWaitCommand(waitFor = null, interval = null) {
        var waitcommand = new GWaitCommand();
        waitcommand.Machine = this;
        waitcommand.WaitFor = waitFor;
        if (interval != null)
            waitcommand.Interval = interval;
        else
            waitcommand.Interval = this.DefaultIdleCheckInterval;
        return waitcommand;
    }
    ReportWaitCommandForG(cmd = null, interval = null) {
        if (cmd)
            this.PushG(cmd);
        return this.ReporterG(this.GetWaitCommand(cmd, interval));
    }
    Reporter(cmd) {
        var e = this;
        return new Promise(function (r) {
            cmd.Reporter = r,
                e.Push(cmd);
        });
    }
    ReporterG(cmd) {
        var e = this;
        return new Promise(function (r) {
            cmd.Reporter = r,
                e.PushG(cmd);
        });
    }
    Push_For_Settings() {
        var cmd = new Command("$$");
        cmd.Machine = this;
        cmd.OnMessaged = function (line) {
            if (line.startsWith("$")) {
                var ID = line.substring(1, line.indexOf('='));
                if (this.Machine.Settings.has(ID)) {
                    var setting = this.Machine.Settings.get(ID);
                    setting.Value = parseFloat(line.substring(line.indexOf("=") + 1));
                }
                else {
                    var setting = new MachineSetting();
                    setting.ID = ID;
                    setting.Value = parseFloat(line.substring(line.indexOf("=") + 1));
                    setting.Name = "none";
                    this.Machine.Settings.set(setting.ID, setting);
                }
            }
            cmd.Result = this.Machine.Settings.size.toString() + " settings got.";
        };
        this.Push(cmd);
    }
    Push_For_Information() {
        var cmd = new Command("$I");
        cmd.Machine = this;
        cmd.firstLine = true;
        cmd.OnMessaged = function (line) {
            if (cmd.firstLine) {
                cmd.Machine.Infomation = line.substring(1, line.length - 1).split(":")[2];
                cmd.firstLine = false;
            }
            cmd.Result = cmd.Machine.Infomation;
        };
        this.Push(cmd);
    }
    Push_For_Set_Information(information) {
        var cmd = new Command("$I=" + information);
        this.Infomation = information;
        this.Push(cmd);
    }
    GetGcodeSet(name, force = false) {
        if (!name)
            return null;
        if (this.GcodeSets.has(name)) {
            return this.GcodeSets.get(name);
        }
        if (force) {
            var record = new GcodeSet(name);
            this.GcodeSets.set(record.Name, record);
            return record;
        }
        return null;
    }
    GcodeSetAction(action, name, newname) {
        switch (action) {
            case EmGcodeSetAction.Record:
                if (newname)
                    name = newname;
                var rec = this.GetGcodeSet(name, true);
                if (rec) {
                    if (!this.Recordings.has(name))
                        this.Recordings.set(rec.Name, rec);
                }
                break;
            case EmGcodeSetAction.StopRecord:
                if (newname)
                    name = newname;
                if (this.Recordings.has(name))
                    this.Recordings.delete(name);
                break;
            case EmGcodeSetAction.Go:
                if (newname)
                    name = newname;
                var rec = this.GetGcodeSet(name, true);
                for (let cmd of rec.Gcodes) {
                    this.PushG(new GCommand(cmd));
                }
                break;
            case EmGcodeSetAction.Push:
                newname = newname.trim();
                if (newname || newname == '')
                    return;
                var rec = this.GetGcodeSet(name, true);
                if (newname.indexOf("\r\n") > 0) {
                    for (let g of newname.split('\r\n')) {
                        rec.Gcodes.push(g);
                    }
                }
                else {
                    rec.Gcodes.push(newname);
                }
                break;
            case EmGcodeSetAction.Clear:
                if (newname)
                    name = newname;
                var rec = this.GetGcodeSet(name, true);
                rec.Clear();
                break;
            case EmGcodeSetAction.Delete:
                if (newname)
                    name = newname;
                if (this.DefaultGcommandSet.Name == name)
                    break;
                if (this.Recordings.has(name))
                    this.Recordings.delete(name);
                if (this.GcodeSets.has(name))
                    this.GcodeSets.delete(name);
                break;
            case EmGcodeSetAction.DeleteAll:
                this.Recordings.clear;
                this.GcodeSets.clear;
                this.DefaultGcommandSet.Clear;
                this.GcodeSets.set(this.DefaultGcommandSet.Name, this.DefaultGcommandSet);
            case EmGcodeSetAction.Import:
                var gf = new GFileCommand();
                var rec = this.GetGcodeSet(name, true);
                if (!rec)
                    return;
                if (gf.ReadSyncFromFile(newname)) {
                    for (let g of gf.Gcodes) {
                        if (g.startsWith("##")) {
                            rec = this.GetGcodeSet(name + "-" + g.substring(2), true);
                        }
                        rec.Gcodes.push(g);
                    }
                }
                ;
                break;
            case EmGcodeSetAction.Export:
                var rec = this.GetGcodeSet(name, true);
                if (rec)
                    rec.Export(newname);
                break;
            case EmGcodeSetAction.ExportAll:
                var gcodes = Array();
                for (let rec of this.GcodeSets.values()) {
                    gcodes.push("##" + rec.Name);
                    for (let command of rec.Gcodes) {
                        gcodes.push(command);
                    }
                }
                fs_1.default.writeFile(newname, gcodes.join("\r\n"), function (err) {
                    if (err) {
                        AlertError("Export To " + newname + " failed.");
                    }
                });
                break;
            default:
                break;
        }
    }
    Menu_GcodeSets() {
        var menu = [{ text: 'No Collections', value: "" }];
        if (this.GcodeSets.size > 0)
            menu.length = 0;
        this.GcodeSets.forEach((v, k) => {
            menu.push({ text: k, value: k });
        });
        return menu;
    }
    PushGcode(command) {
        command = command.trim();
        if (this.Status.State == EmState.Sleep && command != EmCommand.ResetGRBL) {
            AlertError("Machine is sleeping. disconnect first and then connect again!", 0);
            return;
        }
        if (this.Status.State == EmState.Hold && command != EmCommand.Resume) {
            AlertError("Machine is 'paused'. send system command '>~ Resume' to free hold first!", 0);
            return;
        }
        if (!ImCommand.Has(command)) {
            var gcmd = new GCommand(command);
            gcmd.Result = '';
            this.PushG(gcmd);
            return;
        }
        else {
            var cmd = new Command(command);
            cmd.Result = '';
            switch (command.toUpperCase()) {
                case EmCommand.Sleep:
                    cmd.EchoType = EmEcho.Nothing;
                    this.Status.State = EmState.Sleep;
                    this.Push(cmd);
                    return;
                case EmCommand.Pause:
                    cmd.EchoType = EmEcho.WaitSomeTime;
                    this.Status.State = EmState.Hold;
                    this.Push(cmd);
                    return;
                case EmCommand.Resume:
                    cmd.EchoType = EmEcho.WaitSomeTime;
                    this.Status.State = EmState.Run;
                    this.Push(cmd);
                    return;
                case EmCommand.ResetGRBL:
                    cmd.EchoType = EmEcho.Nothing;
                    this.Status.State = EmState.Connected;
                    this.Push(cmd);
                    return;
                default:
                    cmd.OnEchoed = function () { this.Result = cmd.Echoes.join("\n"); };
                    this.Push(cmd);
                    return;
            }
        }
    }
    ReportGcode(command) {
        command = command.trim();
        if (this.Status.State == EmState.Sleep) {
            return AlertError("Machine is sleeping. disconnect first and then connect again!", 0);
        }
        if (this.Status.State == EmState.Hold && command != '~') {
            return AlertError("Machine is holding. send ~ to free hold first!", 0);
        }
        if (!ImCommand.Has(command)) {
            var gcmd = new GCommand(command);
            gcmd.Result = 0;
            return this.ReporterG(gcmd).then(ret => (ret));
        }
        else {
            var cmd = new Command(command);
            cmd.Result = 0;
            switch (command.toUpperCase()) {
                case EmCommand.Sleep:
                    cmd.EchoType = EmEcho.Nothing;
                    this.Status.State = EmState.Sleep;
                    return this.Reporter(cmd);
                case EmCommand.Pause:
                    cmd.EchoType = EmEcho.Nothing;
                    this.Status.State = EmState.Hold;
                    return this.Reporter(cmd);
                case EmCommand.Resume:
                    cmd.EchoType = EmEcho.WaitSomeTime;
                    this.Status.State = EmState.Run;
                    return this.Reporter(cmd);
                case EmCommand.ResetGRBL:
                    cmd.EchoType = EmEcho.Nothing;
                    this.Status.State = EmState.Connected;
                    return this.Reporter(cmd);
                default:
                    cmd.OnEchoed = function () { this.Result = cmd.Echoes.join("\n"); };
                    return this.Reporter(cmd).then(ret => (ret));
            }
        }
    }
    Push_GPointArgs(args) {
        var gcmd = new GCommand();
        gcmd.GPoint.ParseArgs(args);
        if (gcmd.GPoint.Error) {
            AlertError("Feed can not be null");
            return;
        }
        this.PushG(gcmd);
    }
    ReportAxisValue(AxiesName) {
        if (this.Last != null) {
            if (this.Last.Text == '?' && this.Last.Echoed && this.Status.IsIdle) {
                return this.Status.AxisValue(AxiesName);
            }
        }
        var cmd = new Command("?");
        cmd.Machine = this;
        cmd.OnMessaged = function (line) {
            if (line.startsWith("<")) {
                this.Machine.Status.Parse(line);
                this.Result = this.Machine.Status.AxisValue(AxiesName);
            }
        };
        return this.Reporter(cmd).then(ret => (ret));
    }
    ReportIdle() {
        if (this.Last != null) {
            if (this.Last.Text == '?' && this.Last.Echoed && this.Status.IsIdle) {
                return true;
            }
        }
        var cmd = new Command("?");
        cmd.Machine = this;
        cmd.OnMessaged = function (line) {
            if (line.startsWith("<")) {
                this.Machine.Status.Parse(line);
                this.Result = this.Machine.Status.IsIdle;
            }
        };
        return this.Reporter(cmd).then(ret => (ret));
    }
}
class ScratchGRBL {
    constructor(runtime) {
        this.EXTENSION_ID = "ScratchGRBL";
        this.name = "Scratch GRBL";
        this.decoder = new TextDecoder;
        this.encoder = new TextEncoder;
        this.lineBuffer = '';
        this.Machine = new Machine();
        this.runtime = runtime;
        this.comm = new runtime.ioDevices.comm(this.EXTENSION_ID);
        this.fs = runtime.ioDevices.fs;
        this.runtime.registerPeripheralExtension(this.EXTENSION_ID, this);
        this.onmessage = this.onmessage.bind(this);
        this.write = this.write.bind(this);
        this.Machine.Com_Write = this.write.bind(this);
        this.Machine.GRBL = this;
        this.stopAll = this.stopAll.bind(this);
        this.runtime.on("PROJECT_STOP_ALL", this.stopAll);
        RunTime = this.runtime;
        EmCommand["CancelJOG"] = String.fromCharCode(0X85);
        EmCommand["ResetGRBL"] = String.fromCharCode(0x84);
        ImCommand.CreateValueMap();
    }
    write(data) {
        this.comm.write(data + "\r");
    }
    onmessage(t) {
        var e = this.decoder.decode(t);
        if (this.lineBuffer += e, -1 !== this.lineBuffer.indexOf("\r\n")) {
            var lines = this.lineBuffer.split("\r\n");
            this.lineBuffer = lines.pop();
            for (const l of lines) {
                this.Machine.Com_Read(l.trim());
            }
        }
    }
    getDeviceList() {
        return this.comm.getDeviceList();
    }
    scan() {
        this.comm.getDeviceList().then((result) => {
            this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
        });
    }
    connect(id) {
        var e = this;
        this.comm.connect(id).then(function (t) {
            e.comm.onmessage = e.onmessage,
                e.runtime.emit(e.runtime.constructor.PERIPHERAL_CONNECTED);
            setTimeout(function () {
                e.Machine.Connect();
            }, 2e3);
        }).catch(function (t) {
            Log.warn("connect GRBL peripheral fail", t);
        });
    }
    disconnect() {
        this.comm.disconnect();
        this.Machine.Disconnect();
    }
    isConnected() {
        return this.comm.isConnected();
    }
    stopAll(arg0, stopAll) {
    }
    sleep(t) {
        return new Promise(function (e) {
            return setTimeout(e, t);
        });
    }
    get Runable() {
        if (!this.isConnected()) {
            return AlertInfo("Connect device first!", false);
        }
        if (this.Machine.Status.State > EmState.Run) {
            return AlertInfo('Machine is ' + this.Machine.Status.Name + ' reset device and connect again!', false);
        }
        return true;
    }
    Get_Axies(args) {
        if (!this.Runable)
            return null;
        return this.Machine.ReportAxisValue(args.AxiesName);
    }
    Get_Idle() {
        if (!this.Runable)
            return null;
        return this.Machine.ReportIdle();
    }
    Goto_XYZ(args) {
        if (!this.Runable)
            return;
        this.Machine.Push_GPointArgs(args);
    }
    Goto_XYZ_Gcode(args) {
        var gcmd = new GCommand();
        gcmd.GPoint.ParseArgs(args);
        if (gcmd.GPoint.Error) {
            return AlertError(gcmd.GPoint.Error, 0);
        }
        return gcmd.ToCom;
    }
    Set_Setting(args) {
        if (!this.isConnected()) {
            AlertInfo("Connect device first!");
            return;
        }
        if (!args.SettingValue) {
            return;
        }
        else {
            if (this.Machine.Settings.has(args.SettingID)) {
                var setting = this.Machine.Settings.get(args.SettingID);
                setting.Value = args.SettingValue;
                this.Machine.Push(setting.Command);
                return;
            }
        }
        if (args.SettingID == -3) {
            var cmd = new Command("$N0=" + args.SettingValue);
            this.Machine.Push(cmd);
            this.Machine.N0 = args.SettingValue;
            return;
        }
        else if (args.SettingID == -4) {
            var cmd = new Command("$N1=" + args.SettingValue);
            this.Machine.N1 = args.SettingValue;
            this.Machine.Push(cmd);
            return;
        }
        else if (args.SettingID == -5) {
            if (args.SettingValue != '') {
                this.Machine.Push_For_Set_Information(args.SettingValue);
            }
            return;
        }
        return;
    }
    Send_Command(args) {
        if (!this.isConnected()) {
            AlertInfo("Connect device first!");
            return;
        }
        if (!args.CommandSel) {
            return;
        }
        this.Machine.PushGcode(args.CommandSel);
        return;
    }
    Send_Gcode(args) {
        if (!this.isConnected()) {
            AlertInfo("Connect device first!", 0);
            return;
        }
        var gcode = args.Gcode;
        if (!gcode || gcode == 0) {
            return;
        }
        if (gcode.indexOf("\r\n") > -1) {
            for (let g of gcode.split('\r\n')) {
                this.Machine.PushG(new GCommand(g));
            }
        }
        else {
            this.Machine.PushGcode(gcode);
        }
        return;
    }
    Help_Command(args) {
        if (!args.CommandSel)
            return;
        switch (args.CommandSel) {
            case EmHelpCommand.Help:
                this.fs.openSite("https://www.scratchGRBL.com", "_blank");
                break;
            case EmHelpCommand.ConsoleOn:
                consoleOn = true;
                break;
            case EmHelpCommand.ConsoleOff:
                consoleOn = false;
                break;
            case EmHelpCommand.Clearqueque:
                this.Machine.ClearCommands();
                break;
            default:
                break;
        }
        return;
    }
    Wait_Gcode(args) {
        if (!this.isConnected()) {
            AlertInfo("Connect device first!", 0);
            return;
        }
        var gcode = args.Gcode;
        if (!gcode || gcode == 0) {
            return this.Machine.ReportWaitCommandForG();
        }
        if (gcode.indexOf("\r\n") > -1) {
            for (let g of gcode.split('\r\n')) {
                this.Machine.PushG(new GCommand(g));
            }
        }
        else {
            this.Machine.PushGcode(gcode);
        }
        return this.Machine.ReportWaitCommandForG();
    }
    For_GcodeSet(args) {
        this.Machine.GcodeSetAction(args.Action, args.Name, args.NewName);
    }
    Get_GcodeSet(args) {
        if (args.name) {
            var record = this.Machine.GetGcodeSet(args.name, false);
            if (record) {
                return record.ToText;
            }
        }
        return '';
    }
    Note() {
        return;
    }
    Menu_Setting() { return this.Machine.Menu_Setting(); }
    Menu_Axies() { return ImEnumAxis.Menu; }
    Menu_GTypes() { return ImEnumG.Menu; }
    Menu_GTypesNonable() { return ImEnumG.NonableMenu; }
    Menu_GcodeSets() {
        return this.Machine.Menu_GcodeSets();
    }
    Menu_GcodeSet_Action() {
        return ImGcodeSetAction.Menu;
    }
    Menu_LocaType() {
        return ImLoca.Menu;
    }
    Menu_EnumHelpCommand() {
        return ImHelpCommand.Menu;
    }
    getInfo() {
        return {
            id: "ScratchGRBL",
            name: "Scratch GRBL",
            color1: '#0FBD8C',
            color2: '#0DA57A',
            menuIconURI: menuIcon,
            showStatusButton: true,
            blocks: [
                { opcode: 'Help_Command',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CommandSel: {
                            type: ArgumentType.STRING,
                            menu: "Menu_EnumHelpCommand",
                            defaultValue: 'Help'
                        },
                    },
                    text: '[CommandSel]' },
                { opcode: 'Goto_XYZ',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        GType: {
                            type: ArgumentType.STRING,
                            menu: "Menu_GType",
                            defaultValue: EmG.G0
                        },
                        Feed: {
                            type: ArgumentType.NUMBER
                        },
                        Pos0: {
                            type: ArgumentType.NUMBER,
                        },
                        Pos1: {
                            type: ArgumentType.NUMBER,
                        },
                        Pos2: {
                            type: ArgumentType.NUMBER,
                        },
                        Pos3: {
                            type: ArgumentType.NUMBER,
                        },
                        Pos4: {
                            type: ArgumentType.NUMBER,
                        },
                        LocateType: {
                            type: ArgumentType.STRING,
                            menu: "Menu_LocateType",
                            defaultValue: EmLoca.Default
                        }
                    },
                    text: 'Run[GType][Pos0][Pos1][Pos2][Pos3][Pos4][LocateType]Feed[Feed]' },
                { opcode: 'Goto_XYZ_Gcode',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        GType: {
                            type: ArgumentType.STRING,
                            menu: "Menu_GTypeNonable",
                            defaultValue: EmG.G0
                        },
                        Feed: {
                            type: ArgumentType.NUMBER
                        },
                        Pos0: {
                            type: ArgumentType.NUMBER,
                        },
                        Pos1: {
                            type: ArgumentType.NUMBER,
                        },
                        Pos2: {
                            type: ArgumentType.NUMBER,
                        },
                        Pos3: {
                            type: ArgumentType.NUMBER,
                        },
                        Pos4: {
                            type: ArgumentType.NUMBER,
                        },
                        LocateType: {
                            type: ArgumentType.STRING,
                            menu: "Menu_LocateType",
                            defaultValue: EmLoca.Default
                        },
                    },
                    text: '[GType][Pos0][Pos1][Pos2][Pos3][Pos4][LocateType]Feed[Feed]' },
                { opcode: 'Wait_Gcode',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        Gcode: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    },
                    text: 'Wait[Gcode]' },
                { opcode: 'Send_Gcode',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        Gcode: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    },
                    text: 'Run[Gcode]' },
                { opcode: 'Get_Axies',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        AxiesName: {
                            type: ArgumentType.STRING,
                            menu: "Menu_Axies",
                            defaultValue: 'X'
                        }
                    },
                    text: '[AxiesName]' },
                { opcode: 'Get_Idle',
                    blockType: BlockType.BOOLEAN,
                    text: 'IDLE' },
                { opcode: 'Set_Setting',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        SettingID: {
                            type: ArgumentType.STRING,
                            menu: "Menu_Setting",
                            defaultValue: '-1'
                        },
                        SettingValue: {
                            type: ArgumentType.STRING,
                            defaultValMenu_Settingue: -1
                        },
                    },
                    text: '[SettingID][SettingValue]' },
                { opcode: 'Send_Command',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CommandSel: {
                            type: ArgumentType.STRING,
                            menu: "Menu_SystemCommand",
                            defaultValue: EmCommand.Pause
                        }
                    },
                    text: '[CommandSel]' },
                { opcode: 'For_GcodeSet',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        NewName: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
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
                    text: '[Name][Action][NewName]' },
                { opcode: 'Get_GcodeSet',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        NewName: {
                            type: ArgumentType.STRING,
                        },
                        Name: {
                            type: ArgumentType.STRING,
                            menu: "Menu_GcodeSet_Names",
                            defaultValue: this.Machine.DefaultGcommandSet.Name
                        }
                    },
                    text: '[Name]' },
            ],
            menus: {
                Menu_Setting: 'Menu_Setting',
                Menu_GType: 'Menu_GTypes',
                Menu_GTypeNonable: 'Menu_GTypesNonable',
                Menu_LocateType: 'Menu_LocaType',
                Menu_GcodeSet_Names: 'Menu_GcodeSets',
                Menu_GcodeSet_Actions: 'Menu_GcodeSet_Action',
                Menu_Axies: "Menu_Axies",
                Menu_EnumHelpCommand: 'Menu_EnumHelpCommand',
                Menu_SystemCommand: [
                    { text: '>! : Pause', value: EmCommand.Pause },
                    { text: '>~ : Start', value: EmCommand.Resume },
                    { text: '>Jog Cancel', value: String.fromCharCode(0X85) },
                    { text: '>Go Home', value: 'G28' },
                    { text: '>? : Postion', value: EmCommand.Postion },
                    { text: '>$ : Help', value: EmCommand.Help },
                    { text: '>$$ : View Parameters', value: EmCommand.ViewParameters },
                    { text: '>$H : Homing Cycle', value: EmCommand.GoHoming },
                    { text: '>$X : Kill Alarm Lock', value: EmCommand.KillAlarm },
                    { text: '>$N : Start Blocks', value: EmCommand.StartBlocks },
                    { text: '>$C : GCode Mode', value: EmCommand.GCodeMode },
                    { text: '>$G : Parser State', value: EmCommand.ParserState },
                    { text: '>$SLP : Sleep,reconnect needed', value: EmCommand.Sleep },
                    { text: '>Ctrl-x : Reset GRBL,reconnect needed', value: String.fromCharCode(0x18) },
                    { text: '>Set Coordinates Zero To Origin', value: 'G10 P0 L20 X0 Y0 Z0 A0 B0' },
                    { text: '>Set Coordinates as zero', value: 'G10 P0 L20' },
                ]
            }
        };
    }
}
module.exports = ScratchGRBL;
