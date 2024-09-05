using Microsoft.Extensions.Diagnostics.HealthChecks;
using System.Net.NetworkInformation;

namespace HealthCheckAPI
{
	public class ICMPHealthCheck : IHealthCheck
	{
		private readonly string _host;
		private readonly int _healthyRoundtripTime;

		public ICMPHealthCheck(string host, int healthyRoundtripTime)
		{
			_host = host;
			_healthyRoundtripTime = healthyRoundtripTime;
		}
		public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
		{
			try
			{
				using var ping = new Ping();
				var reply = await ping.SendPingAsync(_host);

				switch (reply.Status)
				{
					case IPStatus.Success:
						var message = $"ICMP to {_host} took {reply.RoundtripTime} ms.";
						return (reply.RoundtripTime > _healthyRoundtripTime) 
							? HealthCheckResult.Degraded(message) 
							: HealthCheckResult.Healthy(message);

					default:
						var messageTwo = $"ICMP to {_host} failed: {reply.Status}";
						return HealthCheckResult.Unhealthy(messageTwo);
				}
			}
			catch (Exception ex)
			{
				var message = $"ICMP to {_host} failed: {ex.Message}";
				return HealthCheckResult.Unhealthy(message);
			}
		}
	}
}
