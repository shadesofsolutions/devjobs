import scraper
import json
import click


filterFlags = ['-hrk', '-pyo', '-wwr', '-rtk', '-emr', '-rmt', '-sof', '-rto']
filterOptions = {
    "hackerrank": scraper.hackerrank_jobs,
    "pythonorg": scraper.pythonorg_jobs,
    "weworkremotely": scraper.weworkremotely_jobs,
    "remoteok": scraper.remoteok_jobs,
    "employremotely": scraper.employremotely_jobs,
    "remotive": scraper.remotive_jobs,
    "stackoverflow": scraper.stackoverflow_jobs,
    "remoteco": scraper.remoteco_jobs
}


@click.group()
def cli():
    pass


def allJobs():
    jobs = {}
    for key in filterOptions.keys():
        jobs[key] = filterOptions.get(key)()
    click.echo(json.dumps(jobs))


@click.command()
@click.option('--list', '-l', default="a", help='list jobs for a company [OPTIONs]')
def list(list):

    if (list == "a" or list == "all"):
        allJobs()
    try:
        func = filterOptions.get(list)
        if func is not None:
            # print(json.dumps({"point":func()}))
            click.echo(json.dumps(func()))
        else:
            raise KeyError
    except KeyError:
        click.echo(json.dumps(
            {"message": "invalid site key, expects any of " + " | ".join(filterOptions.keys())}))


cli.add_command(list)

if __name__ == '__main__':
    cli()
