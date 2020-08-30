fn printit(s: String) -> String {
  println!("In fn: {}", s);
  s
}

fn main() {
  let s = String::from("foo");
  let s2 = printit(s);
  println!("In main: {}", s2);
}
