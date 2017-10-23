open Contract;

type t 'a = Js.Array.t 'a;

external unsafePop : 'a = "pop" [@@bs.send.pipe : array 'a];

external unsafeGet : t 'a => int => 'b = "" [@@bs.get_index];

external unsafeSet : t 'a => int => 'b => unit = "" [@@bs.set_index];

let includes = Js.Array.includes;

let indexOf = Js.Array.indexOf;

let length = Js.Array.length;

let forEach = Js.Array.forEach;

let push = Js.Array.push;

let pop = Js.Array.pop;

let deleteBySwap (index: int) (lastIndex: int) (arr: array 'item) => {
  requireCheck (
    fun () =>
      test
        "lastIndex should == arr.length"
        (fun () => lastIndex |> assertEqual Int (Js.Array.length arr - 1))
  );
  /* arr.(index) = arr.(lastIndex); */
  Array.unsafe_set arr index (Array.unsafe_get arr lastIndex);
  unsafePop arr |> ignore
};

let copy = Js.Array.copy;

let createEmpty () => [||];