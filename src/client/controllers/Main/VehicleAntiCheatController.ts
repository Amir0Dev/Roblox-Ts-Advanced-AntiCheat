import { Controller as _0xX1, OnStart as _0xX2 } from "@flamework/core";
import { Players as _0xX3, RunService as _0xX4, Workspace as _0xX5 } from "@rbxts/services";
import { CoreController } from "./Core";

const _0xARR = [
	"\x48\x75\x6d\x61\x6e\x6f\x69\x64",
	"\x56\x65\x68\x69\x63\x6c\x65\x53\x65\x61\x74",
	"\x56\x65\x68\x69\x63\x6c\x65\x73",
	"\x42\x6f\x64\x79",
	"\x6b\x64\x31",
	"\x62\x33\x73",
];

@_0xX1()
export class VehicleAntiCheatController implements _0xX2 {
	constructor(private readonly _0xS: CoreController) {}

	public onStart() {
		this._0xS.waitForReady();
		const _0xL = _0xX3.LocalPlayer;

		const _0xM = (_0xC: Model) => {
			const _0xH = _0xC.WaitForChild(_0xARR[0x0]) as Humanoid;
			let _0xHB: RBXScriptConnection | undefined, _0xTC: RBXScriptConnection | undefined;

			_0xH.Seated.Connect((_0xA, _0xST) => {
				if (_0xHB) {
					_0xHB.Disconnect();
					_0xHB = undefined;
				}
				if (_0xTC) {
					_0xTC.Disconnect();
					_0xTC = undefined;
				}
				if (!_0xA || !_0xST || !_0xST.IsA(_0xARR[0x1] as "VehicleSeat")) return;

				const _0xVS = _0xST as VehicleSeat,
					_0xVF = _0xX5.FindFirstChild(_0xARR[0x2]);
				const _0xPV = _0xVF?.FindFirstChild(_0xL.Name);
				const _0xB = _0xPV?.FindFirstChild(_0xARR[0x3]) as BasePart | undefined;

				let _0xLT = 0x0,
					_0xKV = 0x0;

				if (_0xB && _0xVF) {
					_0xTC = _0xB.Touched.Connect((_0xOP) => {
						if (_0xOP.IsDescendantOf(_0xVF) && !_0xOP.IsDescendantOf(_0xPV!)) _0xLT = os.clock();
					});
				}

				let _0xLP: Vector3 = _0xVS.Position as Vector3,
					_0xLV: number = _0xVS.AssemblyLinearVelocity.Magnitude;

				_0xHB = _0xX4.Heartbeat.Connect((_0xDT: number) => {
					if (!_0xVS.Parent || _0xDT <= 0x0) return;

					const _0xCP: Vector3 = _0xVS.Position as Vector3,
						_0xCAV: Vector3 = _0xVS.AssemblyLinearVelocity as Vector3;
					const _0xCAS: number = _0xCAV.Magnitude;

					const _0xDIS: number = ((_0xCP as Vector3).sub(_0xLP as Vector3) as Vector3).Magnitude;
					const _0xCS: number = _0xDIS / _0xDT;

					if (_0xCAS <= 0x1 && _0xCS >= 0x19) {
						_0xKV += _0xDT;
						if (_0xKV >= 0x4) {
							if (_0xHB) _0xHB.Disconnect();
							this._0xS.fireBan(_0xARR[0x4]);
							return;
						}
					} else _0xKV = math.max(0x0, _0xKV - _0xDT * 0x2);

					if (_0xCAS < 0x15e) {
						const _0xVSP = _0xCAS - _0xLV;
						if (_0xVSP >= 0x16 && os.clock() - _0xLT > 0x3 / 0x5) {
							if (_0xHB) _0xHB.Disconnect();
							if (_0xTC) _0xTC.Disconnect();
							this._0xS.fireBan(_0xARR[0x5]);
							return;
						}
					}

					_0xLP = _0xCP;
					_0xLV = _0xCAS;
				});
			});
		};

		if (_0xL.Character) _0xM(_0xL.Character);
		_0xL.CharacterAdded.Connect(_0xM);
	}
}
