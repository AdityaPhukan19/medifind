import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { AlertCircle, Eye, EyeOff, Mail, Lock, Loader2, CheckCircle2 } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!userEmail || !userPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }
      // TODO: Replace with actual API call
      console.log('User Login:', { email: userEmail, password: userPassword });
      setSuccess(true);
      setTimeout(() => {
        localStorage.setItem('userToken', 'user-token');
        localStorage.setItem('userRole', 'user');
        navigate('/home');
      }, 800);
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!adminEmail || !adminPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail)) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }
      // TODO: Replace with actual API call
      console.log('Admin Login:', { email: adminEmail, password: adminPassword });
      setSuccess(true);
      setTimeout(() => {
        localStorage.setItem('adminToken', 'admin-token');
        localStorage.setItem('userRole', 'admin');
        navigate('/admin');
      }, 800);
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

      <Card className="w-full max-w-md relative z-10 border-0 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
        <CardHeader className="text-center bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 rounded-t-lg">
          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-shadow duration-300">
              <span className="text-4xl">💊</span>
            </div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            MediFind
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">Welcome back to your health companion</CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          {error && (
            <Alert variant="destructive" className="mb-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">Login successful! Redirecting...</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg mb-6">
              <TabsTrigger 
                value="user"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-md transition-all duration-300"
              >
                👤 User Login
              </TabsTrigger>
              <TabsTrigger 
                value="admin"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white rounded-md transition-all duration-300"
              >
                🔐 Admin Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <form onSubmit={handleUserLogin} className="space-y-5 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <Label htmlFor="user-email" className="text-gray-700 font-semibold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-green-500" />
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="you@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      disabled={loading || success}
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300 hover:border-green-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user-password" className="text-gray-700 font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-green-500" />
                    <Input
                      id="user-password"
                      type={showUserPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      disabled={loading || success}
                      className="pl-10 pr-10 border-green-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300 hover:border-green-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowUserPassword(!showUserPassword)}
                      className="absolute right-3 top-3 text-green-600 hover:text-green-700 transition-colors"
                    >
                      {showUserPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading || success}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Logging in...
                    </span>
                  ) : success ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Login Successful!
                    </span>
                  ) : (
                    'Login as User'
                  )}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Don't have an account? </span>
                  <a href="#" className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors">
                    Create one now
                  </a>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-5 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-gray-700 font-semibold">Admin Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-green-500" />
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@example.com"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      disabled={loading || success}
                      className="pl-10 border-green-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300 hover:border-green-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-gray-700 font-semibold">Admin Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-green-500" />
                    <Input
                      id="admin-password"
                      type={showAdminPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      disabled={loading || success}
                      className="pl-10 pr-10 border-green-200 focus:border-green-500 focus:ring-green-500 transition-all duration-300 hover:border-green-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminPassword(!showAdminPassword)}
                      className="absolute right-3 top-3 text-green-600 hover:text-green-700 transition-colors"
                    >
                      {showAdminPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  disabled={loading || success}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Logging in...
                    </span>
                  ) : success ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Login Successful!
                    </span>
                  ) : (
                    'Login as Admin'
                  )}
                </Button>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">🔐 Secure Access:</span> Contact your administrator if you need admin credentials
                  </p>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
