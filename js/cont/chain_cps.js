// chainCPS s f = \k -> s $ \x -> f x $ k


const chainCPS = (s, f) => k => s(x => f(x))(k);
