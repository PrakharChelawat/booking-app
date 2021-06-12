const Registerform =({onhandlesubmit,name,setName,email,setEmail,password,setPassword})=>(
    <form onSubmit={onhandlesubmit} className="mt-3">
            <div className="form-group mb-3">
                <label className="form-label">Your Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                
                />
                <label className="form-label">Your Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                
                />

                <label className="form-label">Your Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                
                />
                <br/>
            
                <button disabled={!email || !password || !name}className="btn btn-primary">submit</button>
                
            </div>


    </form>
    
);
export default Registerform;