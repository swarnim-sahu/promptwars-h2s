import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an uncaught exception:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/10 shadow-lg text-center space-y-4 max-w-xl mx-auto my-12">
          <div className="flex items-center justify-center space-x-2 text-rose-500">
            <AlertTriangle className="w-8 h-8" />
            <h3 className="text-lg font-extrabold tracking-tight uppercase">
              Operational Interface Failure
            </h3>
          </div>
          
          <div className="space-y-1.5">
            <p className="text-xs text-gray-400 leading-relaxed">
              An unexpected runtime exception was isolated within this dashboard viewport layout container. 
              The rest of the system remains operational.
            </p>
            {this.state.error && (
              <pre className="text-[10px] text-rose-400 bg-black/40 p-3 rounded-lg overflow-x-auto text-left font-mono border border-rose-950/50">
                {this.state.error.message}
              </pre>
            )}
          </div>

          <button
            onClick={this.handleReset}
            className="inline-flex items-center space-x-1.5 px-4 py-2 border border-rose-500/30 hover:bg-rose-500/10 text-rose-400 font-bold text-xs rounded-lg transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Active Command Modules</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
